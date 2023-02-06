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

logoutBtn.addEventListener('click', async e => {
	await axios.get('/api/logout');
	window.location.pathname ='/';
})

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})

form.addEventListener('submit', async e => {
    e.preventDefault();
    // const newMenu = {
    //     plato: plato.value,
    //     price: price.value,
    //     image: imageRef.value
    // }
    // console.log(imageRef.files);
    
    if (plato.value === '') {
        alert('Por favor, llene los campos')
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
                window.location.reload();
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
    // console.log(data);

        data.forEach(meal => {
            const comida = document.createElement('li');
            comida.innerHTML = `
                <div class="comida-item" id="${meal.id}">
				<div class="content-plato-precio">
                <span class="plato">${meal.plato}</span>
				<span class="precio">$${meal.price}</span>
                </div>
				<div class="btns">
                <div class="btn-edit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 btn-edit">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
				<div class="btn-deleted">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>                            
                </div>
                </div>
			</div>
            `;

            comidas.append(comida)
        });

        
    } finally {}
};

getMenu();
// const upload = multer({ dest: 'uploads/' });



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
		const comidaItem = e.target.parentElement.parentElement.parentElement;
        console.log(comidaItem);
    //    console.log('si');
    //    console.log(e.target.parentElement.children[1].innerHTML);
        const precioString = e.target.parentElement.parentElement.parentElement.children[0].children[1].innerHTML;
        const comida = e.target.parentElement.parentElement.parentElement.children[0].children[0].innerHTML
        console.log(comida);
        console.log(precioString);
        const precio = precioString.split('$');
        console.log(precio);
       //    console.log(e.target.parentElement.parentElement.children[0].innerHTML);
       comidaItem.innerHTML = `
        <input type="text" class="meal-edit" value="${comida}">
        <input type="number" class="price-edit" step="0.01" maxlength="11" value="${precio[1]}">
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
            
            <p>$${price.value}</p>
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