const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');
const menu = document.querySelector('#menu-list');

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})



const getMenu = async () => {
    // while (menu.firstChild) {
    //     menu.removeChild(menu.firstChild)
    // }

    // const newMenu = {
    //     plato: plato.value,
    //     price: price.value,
    //     // image: imageRef.value
    // }

    try {
        const { data } = await axios.get('/api/menuPublic');
    // console.log(data);

        data.forEach(meal => {
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `
                <li class="comida-item" id="${meal.id}">
				<p>${meal.plato}</p>
				<p>$${meal.price}</p>
			</li>
            `;

            menu.append(menuItem)
        });

        
    } finally {}
};

// let intervalID = setInterval(getMenu, 4000);

getMenu();

