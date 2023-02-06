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
			<div class="contacto-item" id="${userh.id}">
				<span>${userh.firstName + ' ' + userh.lastName}</span>
				
                <span>Cédula: V${userh.ci}</span>
                <span>Dirección: ${userh.address}</span>
                <span>Correo: ${userh.email}</span>
                <span>Rol: ${userh.rol}</span>
				<div>
				<div class="btn-deleted"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 btn-deleted">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                </div>
                </div>
			</div>
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
        const id = e.target.parentElement.parentElement.parentElement.id;
        // console.log(e.target.parentElement.parentElement.parentElement);
            e.target.parentElement.parentElement.parentElement.remove();
        await axios.delete(`/api/users/${id}`)

    }
})