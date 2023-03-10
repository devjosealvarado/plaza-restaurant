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
                <span>Monto: $${ordenItem.precio}</span>
                <span class="fecha">Fecha: ${ordenItem.date}</span>
                <span class="hora">Hora: ${ordenItem.time}</span>
                <span>Estado: ${ordenItem.status}</span>
				<div class="btns">
                <div class="btn-edit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 btn-edit">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </div>
				<div class="btn-deleted">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 btn-deleted">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
                </div>
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
        const id = e.target.parentElement.parentElement.parentElement.id;
		const ordenItem = e.target.parentElement.parentElement.parentElement;
        console.log(e.target.parentElement.parentElement.parentElement);
        console.log(e.target.parentElement.parentElement.parentElement.children[1].innerHTML);
        ordenItem.innerHTML = `
        <span>${e.target.parentElement.parentElement.parentElement.children[0].innerHTML}</span>
        <span class="mesa-edit">${e.target.parentElement.parentElement.parentElement.children[1].innerHTML}</span>
        <span type="text" class="orden-edit" value="">${e.target.parentElement.parentElement.parentElement.children[2].innerHTML}</span>
        <span>${e.target.parentElement.parentElement.parentElement.children[3].innerHTML}</span>
        <span class="fecha">${e.target.parentElement.parentElement.parentElement.children[4].innerHTML}</span>
        <span class="hora">${e.target.parentElement.parentElement.parentElement.children[5].innerHTML}</span>
        <span>Estado: </span>
        <select name="" id="" class="status">
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
            </select>
        <div class="btn-editing"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 btn-editing">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </div>
        `;
    } else if (e.target.classList.contains('btn-editing')) {
        const id = e.target.parentElement.parentElement.id;
        // console.log(id);
		const ordenItem = e.target.parentElement.parentElement;
        console.log(ordenItem);
        const plato = document.querySelector('.meal-edit');
		const price = document.querySelector('.price-edit');

        const mesa = document.querySelector('.mesa-edit');
        const orden = document.querySelector('.orden-edit');
        const estado = document.querySelector('.status')
        

        console.log('si');
            ordenItem.innerHTML = `
            <span>${e.target.parentElement.parentElement.children[0].innerHTML}</span>
            <span>${e.target.parentElement.parentElement.children[1].innerHTML}</span>
            <span type="text" class="orden-edit" value="">${e.target.parentElement.parentElement.children[2].innerHTML}</span>
            <span>${e.target.parentElement.parentElement.children[3].innerHTML}</span>
            <span class="fecha">${e.target.parentElement.parentElement.children[4].innerHTML}</span>
            <span class="hora">${e.target.parentElement.parentElement.children[5].innerHTML}</span>
            <span class="estado">Estado: ${e.target.parentElement.parentElement.children[7].value}</span>
            <div class="btns">
            <div class="btn-edit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 btn-edit">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            <   /svg>
            </div>
            <div class="btn-deleted">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 btn-deleted">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>
            </div>
            `;
            
            await axios.patch(`/api/ordenes/${id}`, {status: estado.value});
    }
});

// EVENTO PARA ELIMINAR COMIDAS

contentOrdenes.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-deleted')) {
        const id = e.target.parentElement.parentElement.parentElement.id;
        console.log(id);
            e.target.parentElement.parentElement.parentElement.remove();
        await axios.delete(`/api/ordenes/${id}`)
    }
})


