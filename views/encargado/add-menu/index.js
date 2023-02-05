const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');

const form = document.querySelector('#form');
const plato = document.querySelector('#meal');
const price = document.querySelector('#price');
const imageRef = document.querySelector('#image');
const comidas = document.querySelector('#comidas')
const editBtn = document.querySelector('.btn-edit')
const logoutBtn = document.querySelector('#btn-logout')
const formBtn = document.querySelector('#btnSubmit');


btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
});

logoutBtn.addEventListener('click', async e => {
	await axios.get('/api/logout');
	window.location.pathname ='/';
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    // const newMenu = {
    //     plato: plato.value,
    //     price: price.value,
    //     image: imageRef.value
    // }
    
    if (plato.value === '') {
        alert('Por favor indique el plato')
    } else if (price.value === '') {
        alert('Por favor indique el precio')
    } else {
        try {
            const newMenu = {
                plato: plato.value.toUpperCase(),
                price: price.value,
                // image: imageRef.value
            }
            const { data } = await axios.post('/api/menus', newMenu, { withCredentials: true});
            console.log(data);
            if (data) {
                alert(`Se registro ${plato.value} como nuevo plato`)
            }
            plato.value= '';
            price.value= '';
        } catch (error) {
            console.log(error.response);
            alert('Ha ocurrido un error :(')
        }
    }
})

const getMenu = async () => {

    const newMenu = {
        plato: plato.value,
        price: price.value,
        // image: imageRef.value
    }

    try {
        const { data } = await axios.get('/api/menus', newMenu);
    console.log(data);

        data.forEach(meal => {
            const comida = document.createElement('li');
            comida.innerHTML = `
                <li class="comida-item" id="${meal.id}">
				<p>${meal.plato}</p>
				<p>${meal.price}</p>
				<button class="btn-edit">✎</button>
				<button class="btn-deleted">✖</button>
			</li>
            `;

            comidas.append(comida)
        });

        
    } finally {}
};

getMenu();
// const upload = multer({ dest: 'uploads/' });

// EVENTO PARA REFRESCAR LISTA DE PLATOS

const showComidas = document.querySelector('#show-comidas');

showComidas.addEventListener('click', e => {
    while (comidas.firstChild) {
        comidas.removeChild(comidas.firstChild)
    }
    getMenu();
})

// EVENTO PARA ELIMINAR COMIDAS

comidas.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-deleted')) {
        const id = e.target.parentElement.id;
            e.target.parentElement.remove();
        await axios.delete(`/api/menus/${id}`)
    }
})

// EVENTO PARA EDITAR COMIDAS

comidas.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.parentElement.id;
		const comidaItem = e.target.parentElement;
        comidaItem.innerHTML = `
        <input type="text" class="meal-edit" value="${e.target.parentElement.children[0].innerHTML}">
        <input type="text" class="price-edit" maxlength="11" value="${e.target.parentElement.children[1].innerHTML}">
        <button class="btn-editing">✔</button>
        `;
    } else if (e.target.classList.contains('btn-editing')) {
        const id = e.target.parentElement.id;
		const comidaItem = e.target.parentElement;
        const plato = document.querySelector('.meal-edit');
		const price = document.querySelector('.price-edit');
        let PRICE_REGEX =  /^[0-9]/;
        let isValid = PRICE_REGEX.test(price.value);
        if (isValid == true) {
            comidaItem.innerHTML = `
            <p>${plato.value}</p>
            <p>${price.value}</p>
            <button class="btn-edit">✎</button>
            <button class="btn-deleted">✖</button>
            `;
            await axios.patch(`/api/menus/${id}`, {plato: plato.value, price: price.value});
        }
    }
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