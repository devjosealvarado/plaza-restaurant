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
        console.log(credentials);
        if (data.rol === 'Admin') {
            window.location.pathname = `/admin/${data.id}`;
        } else if (data.rol === 'Encargado') {
            window.location.pathname = `/encargado/${data.id}`;
        } 
        else {
            window.location.pathname = `/cliente/${data.id}`;
        }
        // console.log(data);
                
    } catch (error) {
        alert('Correo o contraseña incorrectas')
        console.log(error.response.data.error);
    }
    
})

