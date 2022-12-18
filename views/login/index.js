const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const form = document.querySelector('#form');

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const credentials = {
            email: emailInput.value,
            password: passwordInput.value
        };
        const { data } = await axios.post('/api/login/', credentials);
        // window.location.pathname = `/home/${data}`;
        if (data === '639e152b4a234f0a94ee84ec') {
            window.location.pathname = `/home/${data}`;
        } else {
            window.location.pathname = /signup/;
        }
        console.log(data);
    } catch (error) {
        console.log(error.response.data.error);
    }
})