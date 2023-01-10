const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})

const form = document.querySelector('#form');
const mesaInput = document.querySelector('#mesa');
const ordenInput = document.querySelector('#orden');
const formBtn = document.querySelector('#btnSubmit');

form.addEventListener('submit', async e => {
    e.preventDefault();

    const newOrden = {
        mesa: mesaInput.value,
        orden: ordenInput.value,
        status: false
    }
    try {
        const { data } = await axios.post('/api/ordenes', newOrden, { withCredentials: true});
        
    } finally {}
})