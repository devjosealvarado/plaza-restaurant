const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');

const form = document.querySelector('#form');

const formBtn = document.querySelector('#btnSubmit');

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})

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
//             rol:'Cliente'
//         }
        
//         await axios.post('/api/users', newUser);
//         window.location.pathname = '/login';
//     } catch (error) {
//         // console.log(error.response);
//         // alert('El email ya existe')
//     }
// })