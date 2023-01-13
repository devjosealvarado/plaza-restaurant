const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');
const logoutBtn = document.querySelector('#btn-logout')


btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})

logoutBtn.addEventListener('click', async e => {
	await axios.get('/api/logout');
	window.location.pathname ='/';
})