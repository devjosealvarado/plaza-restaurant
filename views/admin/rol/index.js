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
const contactoItem = document.querySelector('.contacto-item')
const logoutBtn = document.querySelector('#btn-logout')


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
        rol:'Encargado'
    }
    try {
    const { data } = await axios.get('/api/users', newUser, {withCredentials: true});
    // console.log(data);
    console.log(data);
    data.forEach(userh => {
        const rol = document.createElement('li');
		rol.innerHTML =`
			<li class="contacto-item" id="${userh.id}">
				<p>${userh.firstName}</p>
				<p>${userh.lastName}</p>
                <p>${userh.ci}</p>
                <p>${userh.address}</p>
                <p>${userh.email}</p>
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
        rol:'Encargado'
    }
    try {
    const { data } = await axios.post('/api/usersEncargados', newUser, { withCredentials: true});
        console.log(data);
        if (data === 'Created') {
            alert(`Se registro a ${nameInput.value + ' ' + lastNameInput.value} como nuevo encargado`)
        } else {
            console.log('no');
            // window.location.pathname='/login';
        }
    // const nombre = nameInput.value;
    // const apellido = lastNameInput.value;
    // const ci = ciInput.value;
    // const address = addressInput.value;
    // const email = emailInput.value;
    // const password = passwordInput.value;
    // console.log({data});


    //     const rol = document.createElement('li');
    // rol.innerHTML =`
    // 	<li class="contacto-item" id="${data}">
    // 		<p>${nombre}</p>
    // 		<p>${apellido}</p>
    //         <p>${ci}</p>
    //         <p>${address}</p>
    //         <p>${email}</p>
    // 		<button class="btn-edit">✎</button>
    // 		<button class="btn-deleted">✖</button>
    // 	</li>
    // `;

    // roles.append(rol);

    } finally {}

    nameInput.value= '';
    lastNameInput.value='';
    ciInput.value='';
    addressInput.value='';
    emailInput.value='';
    passwordInput.value='';
    matchInput.value= '';

    // input_text.value = '';
    // input_numero.value = '';



    // validationInput = false;
    // input_numero.classList = '';




})

getEncargados();

// EVENTO PARA REFRESCAR LISTA DE ENCARGADOS

const showEncargados = document.querySelector('#show-encargados');

showEncargados.addEventListener('click', e => {
    while (roles.firstChild) {
        roles.removeChild(roles.firstChild)
    }
    getEncargados();
});


// EVENTO PARA ELIMINAR ENCARGADOS

roles.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-deleted')) {
        const id = e.target.parentElement.id;
            e.target.parentElement.remove();
        await axios.delete(`/api/users/${id}`)

    }
})