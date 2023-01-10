const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');

const rol = document.querySelector('#rol')
// import { globalData } from '../login/index'

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
    
})

// rol.addEventListener('click', async e => {
//     try {
//         console.log(globalData);
//     } catch (error) {
        
//     }
// })