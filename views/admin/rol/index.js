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

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})




form.addEventListener ('submit', async e => {
    e.preventDefault();

        const newUser = {
            firstName: nameInput.value,
            lastName: lastNameInput.value,
            ci: ciInput.value,
            address: addressInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            rol:'Cliente'
        }

        const { data } = await axios.post('/api/roles2', newUser, { withCredentials: true});
	
		const nombre = nameInput.value;
		const apellido = lastNameInput.value;
        const ci = ciInput.value;
        const address = addressInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        
		// const rol = document.createElement('li');
		// rol.innerHTML =`
		// 	<li class="contacto-item" id="${data.id}">
		// 		<p>${nombre}</p>
		// 		<p class="number">${apellido}</p>
		// 		<button class="btn-edit">✎</button>
		// 		<button class="btn-deleted">✖</button>
		// 	</li>
		// `;
		
		// lista.append(rol);
		// input_text.value = '';
		// input_numero.value = '';
		
		
		
		// validationInput = false;
		// input_numero.classList = '';

    
})




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