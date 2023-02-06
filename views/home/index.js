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
    console.log(data);
        // let dataPlato = [];
        // let pricesss = [];

        // for (let index = 0; index < data.length; index++) {
        //     dataPlato.push(data[index].plato);
        //     pricesss.push(data[index].price)
        // }
        // console.log(dataPlato.sort());
        // const dataPlatoAlfb = dataPlato.sort()
        // console.log(dataPlatoAlfb);
        // console.log(pricesss);

        // dataPlato.push([data[index].plato, data[index].price]);

        data.forEach(meal => {
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `
                <div class="comida-item" id="${meal.id}">
				<span>${meal.plato}</span>
                <span>$${meal.price}</span>
			</div>
            `;

            menu.append(menuItem)
        });

        
    } finally {}
};

// let intervalID = setInterval(getMenu, 4000);

getMenu();

