const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const lastNameInput = document.querySelector('#lastName');
const ciInput = document.querySelector('#ci');
const addressInput = document.querySelector('#address');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const matchInput = document.querySelector('#passwordMatch');
const formBtn = document.querySelector('#btnSubmit');
const roles = document.querySelector('#roles');
const rolInput = document.querySelector('#rol')
const contactoItem = document.querySelector('.contacto-item')
const logoutBtn = document.querySelector('#btn-logout')
// console.log(rolInput.value);

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})

logoutBtn.addEventListener('click', async e => {
	await axios.get('/api/logout');
	window.location.pathname ='/';
})

const getEncargados = async () => {

    const newUser = {
        firstName: nameInput.value,
        lastName: lastNameInput.value,
        ci: ciInput.value,
        address: addressInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        rol: rolInput.value
    }
    try {
    const { data } = await axios.get('/api/users', newUser, {withCredentials: true});
    

    // FILTRO PARA OCULTAR CLIENTES DE LA LISTA DE USUARIOS
    const deleteCliente = data.filter(item => item.rol != 'Cliente');
    // FILTRO PARA OCULTAR AL ADMINISTRADOR DE LA LISTA DE USUARIOS
    const dataFinal = deleteCliente.filter(item => item.rol != 'Admin')

    dataFinal.forEach(userh => {
        const rol = document.createElement('li');
		rol.innerHTML =`
			<li class="contacto-item" id="${userh.id}">
				<p>${userh.firstName}</p>
				<p>${userh.lastName}</p>
                <p>${userh.ci}</p>
                <p>${userh.address}</p>
                <p>${userh.email}</p>
                <p>${userh.rol}</p>
				<button class="btn-edit">✎</button>
				<button class="btn-deleted">✖</button>
			</li>
		`;

		roles.append(rol);
    });

    } finally{
    }
};

form.addEventListener ('submit', async e => {
    e.preventDefault();
    
    const newUser = {
        firstName: nameInput.value,
        lastName: lastNameInput.value,
        ci: ciInput.value,
        address: addressInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        rol:rolInput.value
    }
    try {
    const { data } = await axios.post('/api/usersEncargados', newUser, { withCredentials: true});
        console.log(data);
        if (data === 'Created') {
            alert(`Se registro a ${nameInput.value + ' ' + lastNameInput.value} como nuevo ${rolInput.value}`)
            window.location.reload()
        } else {
            console.log('no');
        }

    } finally {}

    // nameInput.value= '';
    // lastNameInput.value='';
    // ciInput.value='';
    // addressInput.value='';
    // emailInput.value='';
    // passwordInput.value='';
    // matchInput.value= '';
    // rolInput.value='';
    

})

getEncargados();

// EVENTO PARA REFRESCAR LISTA DE ENCARGADOS




// EVENTO PARA ELIMINAR ENCARGADOS

roles.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-deleted')) {
        const id = e.target.parentElement.id;
            e.target.parentElement.remove();
        await axios.delete(`/api/users/${id}`)

    }
})