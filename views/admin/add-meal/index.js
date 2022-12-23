const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})