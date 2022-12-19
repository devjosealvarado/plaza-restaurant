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

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newUser = {
            firstName: nameInput.value,
            lastName: lastNameInput.value,
            ci: ciInput.value,
            address: addressInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            rol:'Encargado'
        }
        
        await axios.post('/api/users', newUser, {withCredentials: true});
        // window.location.pathname = '/login';
    } catch (error) {
        // console.log(error.response);
        // alert('El email ya existe')
    }
})