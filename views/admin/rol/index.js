

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


btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
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
        const { data } = await axios.post('/api/users', newUser, { withCredentials: true});
            if (data === 'Created') {
                alert(`Se registro a ${nameInput.value + ' ' + lastNameInput.value} como nuevo encargado`)
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

const showEncargados = document.querySelector('#show-encargados');

showEncargados.addEventListener('click', e => {
    while (roles.firstChild) {
        roles.removeChild(roles.firstChild)
    }
    getEncargados();
})

// showEncargados.addEventListener('click', e => {
//     showEncargados.classList.toggle('si')
//     roles.classList.toggle('rol')
//     if(showEncargados.classList.contains('si')) {
//         getEncargados();
//         console.log('si');
//     } else if (showEncargados.classList.contains('no')) {
//         console.log('no');
//     }
//     // getEncargados();
// })

// getEncargados();


// const getUser = async () => {
//     const { data } = await axios.get('controllers/users');
//     console.log(data);
// }
// getUser();
// form.addEventListener('submit', async e => {
//     e.preventDefault();
//     try {
//         const newUser = {
//             firstName: nameInput.value,
//             lastName: lastNameInput.value,
//             ci: ciInput.value,
//             address: addressInput.value,
//             email: emailInput.value,
//             password: passwordInput.value,
//             rol:'Encargado'
//         }
        
//         await axios.post('/api/users', newUser, {withCredentials: true});
//         // window.location.pathname = '/login';
//     } catch (error) {
//         // console.log(error.response);
//         // alert('El email ya existe')
//     }
// })