const btnMenu = document.querySelector('#button-menu');
const options = document.querySelector('.options');

btnMenu.addEventListener('click', e => {
    options.classList.toggle('show-options');
})

const contenedor = document.querySelector('#contenedor')
const form = document.querySelector('#form');
const mesaInput = document.querySelector('#mesa');
const ordenInput = document.querySelector('#orden');
const formBtn = document.querySelector('#btnSubmit');
const contentOrdenes = document.querySelector('#ordenes');
const logoutBtn = document.querySelector('#btn-logout')
const contentOrdenes5 = document.querySelector('#ordenes5');
const contentOrdenes6 = document.querySelector('#ordenes6');
const montoTotal5 = document.querySelector('#monto-total5');
const montoTotal6 = document.querySelector('#monto-total6');

const contentOrdenes5B = document.querySelector('#ordenes5B');
const contentOrdenes6B = document.querySelector('#ordenes6B');
const montoTotal5B = document.querySelector('#monto-total5B');
const montoTotal6B = document.querySelector('#monto-total6B');

logoutBtn.addEventListener('click', async e => {
	await axios.get('/api/logout');
	window.location.pathname ='/';
})


// form.addEventListener('submit', async e => {
//     e.preventDefault();

//     const newOrden = {
//         mesa: mesaInput.value,
//         orden: ordenInput.value,
//         status: 'Pendiente',
//         // date: Date.now()
//     }
//     try {
//         const { data } = await axios.post('/api/ordenes', newOrden, { withCredentials: true});
//         console.log(data);
//         const ordenLi = document.createElement('li');
//             // console.log(ordenLi);
//             ordenLi.innerHTML = `
//                 <li class="orden-item" id="${data.id}">
// 				<p>Mesero:${data.mesero}</p>
//                 <p>Mesa: </p>
//                 <p>${data.mesa}</p>
//                 <p>Orden: </p>
// 				<p>${data.orden}</p>
//                 <p class="fecha">Fecha: ${data.date}</p>
//                 <p class="hora">Hora: ${data.time}</p>
//                 <p class="estado">${data.status}</p>
// 				<button class="btn-edit">✎</button>
// 				<button class="btn-deleted">✖</button>
// 			</li>
//             `;

//             contentOrdenes.append(ordenLi)
        
//     } finally {}
// })


// EVENTO PARA PEDIR LAS ORDENES

const getOrdenes = async () => {
    while (contentOrdenes.firstChild) {
        contentOrdenes.removeChild(contentOrdenes.firstChild)
    }

    try {
        const { data } = await axios.get('/api/ordenesEncargado');
    console.log(data);

        data.forEach(ordenItem => {
            const ordenLi = document.createElement('div');
            // console.log(ordenLi);
            ordenLi.innerHTML = `
                <div class="orden-item" id="${ordenItem.id}">
				<span>Mesero: ${ordenItem.mesero}</span>
                <span>Mesa: ${ordenItem.mesa}</span>
                <span>Orden: ${ordenItem.orden}</span>
                <span class="fecha">Fecha: ${ordenItem.date}</span>
                <span class="hora">Hora: ${ordenItem.time}</span>
                <span>Estado: ${ordenItem.status}</span>
				<button class="btn-edit">✎</button>
				<button class="btn-deleted">✖</button>
			</div>
            `;

            contentOrdenes.append(ordenLi)
        });



        
    } finally {}
};

// let intervalID = setInterval(getOrdenes, 30000);

getOrdenes();

// EVENTO PARA EDITAR COMIDAS

contentOrdenes.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.parentElement.id;
		const ordenItem = e.target.parentElement;
        console.log(e.target.parentElement);
        ordenItem.innerHTML = `
        <p>${e.target.parentElement.children[0].innerHTML}</p>
        <p>Mesa: </p>
        <input type="number" class="mesa-edit" value="${e.target.parentElement.children[2].innerHTML}">
        <p>Orden: </p>
        <input type="text" class="orden-edit" value="${e.target.parentElement.children[4].innerHTML}">
        <p class="fecha">${e.target.parentElement.children[5].innerHTML}</p>
        <p class="hora">${e.target.parentElement.children[6].innerHTML}</p>
        <p>Estado: </p>
        <select name="" id="" class="status">
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
            </select>
        <button class="btn-editing">✔</button>
        `;
    } else if (e.target.classList.contains('btn-editing')) {
        const id = e.target.parentElement.id;
		const ordenItem = e.target.parentElement;
        const plato = document.querySelector('.meal-edit');
		const price = document.querySelector('.price-edit');

        const mesa = document.querySelector('.mesa-edit');
        const orden = document.querySelector('.orden-edit');
        const estado = document.querySelector('.status')
        // let estado = false;
        
        console.log(estado);
       
        // console.log(hora);
        let PRICE_REGEX =  /^[0-9]/;
        let isValid = PRICE_REGEX.test(mesa.value);
        if (isValid == true) {
            ordenItem.innerHTML = `
            <p>${e.target.parentElement.children[0].innerHTML}</p>
            <p>Mesa: </p>
            <p>${mesa.value}</p>
            <p>Orden: </p>
            <p>${orden.value}</p>
            <p class="fecha">${e.target.parentElement.children[4].innerHTML}</p>
            <p class="hora">${e.target.parentElement.children[5].innerHTML}</p>
            <p>Estado: </p>
            <p class="estado">${estado.value}</p>
            <button class="btn-edit">✎</button>
            <button class="btn-deleted">✖</button>
            `;
            await axios.patch(`/api/ordenes/${id}`, {mesa: mesa.value, orden: orden.value, status: estado.value});
        }
    }
});

// EVENTO PARA ELIMINAR COMIDAS

contentOrdenes.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-deleted')) {
        const id = e.target.parentElement.id;
            e.target.parentElement.parentElement.remove();
        await axios.delete(`/api/ordenes/${id}`)
    }
})


