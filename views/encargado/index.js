const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})

const form = document.querySelector('#form');
const mesaInput = document.querySelector('#mesa');
const ordenInput = document.querySelector('#orden');
const formBtn = document.querySelector('#btnSubmit');
const contentOrdenes = document.querySelector('#ordenes');

form.addEventListener('submit', async e => {
    e.preventDefault();

    const newOrden = {
        mesa: mesaInput.value,
        orden: ordenInput.value,
        status: 'Pendiente',
        // date: Date.now()
    }
    try {
        const { data } = await axios.post('/api/ordenes', newOrden, { withCredentials: true});
        
    } finally {}
})

const getOrdenes = async () => {

    const newOrden = {
        mesa: mesaInput.value,
        orden: ordenInput.value
        // image: imageRef.value
    }

    try {
        const { data } = await axios.get('/api/ordenes', newOrden);
    console.log(data);

        data.forEach(ordenItem => {
            const ordenLi = document.createElement('li');
            // console.log(ordenLi);
            ordenLi.innerHTML = `
                <li class="orden-item" id="${ordenItem.id}">
				<p>Mesa: </p>
                <p>${ordenItem.mesa}</p>
                <p>Orden: </p>
				<p>${ordenItem.orden}</p>
                <p>Fecha: ${ordenItem.date}</p>
                <p>Hora: ${ordenItem.time}</p>
                <p class="estado">${ordenItem.status}</p>
				<button class="btn-edit">✎</button>
				<button class="btn-deleted">✖</button>
			</li>
            `;

            contentOrdenes.append(ordenLi)
        });

        
    } finally {}
};

getOrdenes();

// EVENTO PARA EDITAR COMIDAS

contentOrdenes.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.parentElement.id;
		const ordenItem = e.target.parentElement;
        ordenItem.innerHTML = `
        <p>Mesa: </p>
        <input type="text" class="mesa-edit" value="${e.target.parentElement.children[1].innerHTML}">
        <p>Orden: </p>
        <input type="text" class="orden-edit" value="${e.target.parentElement.children[3].innerHTML}">
        <button class="btn-editing">✔</button>
        `;
    } else if (e.target.classList.contains('btn-editing')) {
        const id = e.target.parentElement.id;
		const ordenItem = e.target.parentElement;
        const plato = document.querySelector('.meal-edit');
		const price = document.querySelector('.price-edit');

        const mesa = document.querySelector('.mesa-edit');
        const orden = document.querySelector('.orden-edit');

        let PRICE_REGEX =  /^[0-9]/;
        let isValid = PRICE_REGEX.test(mesa.value);
        if (isValid == true) {
            ordenItem.innerHTML = `
            <p>${mesaInput.value}</p>
            <p>${ordenInput.value}</p>
            <button class="btn-edit">✎</button>
            <button class="btn-deleted">✖</button>
            `;
            await axios.patch(`/api/ordenes/${id}`, {mesa: mesaInput.value, orden: ordenInput.value});
        }
    }
})
