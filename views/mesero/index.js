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
const contentCompletados = document.querySelector('#completados')
const logoutBtn = document.querySelector('#btn-logout');
const resultadoBusqueda = document.querySelector('#resultado-busqueda');
const ordenPreliminar = document.querySelector('#orden-preliminar');
const cajaResultados = document.querySelector('#caja-resultados')


// ----------- EVENTO PARA CERRAR SESIÓN ---------//

logoutBtn.addEventListener('click', async e => {
	await axios.get('/api/logout');
	window.location.pathname ='/';
})

// -------- EVENTO DE BUSQUEDA DE PLATOS --------//


const getMenu = async () => {

    // const newMenu = {
    //     plato: plato.value,
    //     price: price.value,
    //     // image: imageRef.value
    // }

    
    const { data } = await axios.get('/api/menus');
    
    // console.log(data);

        // data.forEach(meal => {
        //     const comida = document.createElement('li');
        //     comida.innerHTML = `
        //         <li class="comida-item" id="${meal.id}">
		// 		<p>${meal.plato}</p>
		// 		<p>${meal.price}</p>
		// 		<button class="btn-edit">✎</button>
		// 		<button class="btn-deleted">✖</button>
		// 	</li>
        //     `;

        //     comidas.append(comida)
        // });

    ordenInput.addEventListener('input', e => {
        const letra = e.target.value;
        const menuFiltrado = data.filter(menu => menu.plato.startsWith(letra.toUpperCase()));
        let arr = e.target.value.split('');
        cajaResultados.innerHTML = ` `

        if (arr.length === 0) {
                cajaResultados.style.display = 'none';
            }
        if (arr.length > 0) {
            cajaResultados.style.display = '';
        }

// -------- EVENTO PARA EL FILTRADO DE PLATOS ---------//

        menuFiltrado.forEach(meal => {
            const comida = document.createElement('li');
            comida.innerHTML = `
                <li class="comida-item" id="${meal.id}">
				<p>${meal.plato}</p>
				<p>${meal.price}</p>
                <div id="content-cantidad">
                    <button class="disminuir">-</button>
                    <span name="" class="cantidad">1</span>
                    <button class="incrementar">+</button>
                </div>
                <button class="btnAddPlato">Agregar</button>
			    </li>
            `;

            let a = 0;
            console.log();
            const btnDownLi = comida.children[0].children[2].children[0];
            const btnUpLi = comida.children[0].children[2].children[2]
            const monto = comida.children[0].children[2].children[1];
            
            // console.log(monto);

            btnDownLi.addEventListener('click', () => {
            a--;
            // a = (a < 10) ? "0" + a : a;
            monto.innerText = a;
            });

            const plato = comida.children[0].children[0].innerHTML;
            const precio = comida.children[0].children[1].innerHTML
            
            btnUpLi.addEventListener('click', () => {
                a++;
                monto.innerText = a;
            });
            
//------------EVENTO PARA AÑADIR A VISTA PREVIA DEL PLATO ---------//

            // const montoModificado = comida.children[0].children[2].children[1].innerHTML;
            const btnAddPlato = comida.children[0].children[3];
            

            btnAddPlato.addEventListener('click', e=> {
                console.log(plato);
                console.log(precio);
                console.log(comida.children[0].children[2].children[1].innerHTML);
            })
        
        
            // btnAddPlato.addEventListener('click', e => {
            // console.log('si');;
            // })

            cajaResultados.append(comida);
        });

        
        
    })
        
   
};

getMenu();



// ------------ EVENTO PARA CREAR ORDENES ------- //

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
        console.log(data);
        const ordenLi = document.createElement('li');
            // console.log(ordenLi);
            ordenLi.innerHTML = `
                <li class="orden-item" id="${data.id}">
				<p>Mesa: </p>
                <p>${data.mesa}</p>
                <p>Orden: </p>
				<p>${data.orden}</p>
                <p class="fecha">Fecha: ${data.date}</p>
                <p class="hora">Hora: ${data.time}</p>
                <p class="estado">${data.status}</p>
				<button class="btn-edit">✎</button>
				<button class="btn-deleted">✖</button>
                <div id="content-cantidad">
                <button class="disminuir">-</button>
                <span name="" class="cantidad">0</span>
                <button class="incrementar">+</button>
                </div>
			</li>
            `;

            contentOrdenes.append(ordenLi)
        
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
    // console.log(data);
    data.forEach(a => {
        
        // if (a.mesa === 9) {
        //     if (a.status === 'Pendiente') {
        //         console.log(a);;
        //     }
        // }
    })

        data.forEach(ordenItem => {
            const ordenLi = document.createElement('li');
            // console.log(ordenLi);
            if (ordenItem.status === 'Pendiente') {
                ordenLi.innerHTML = `
                <li class="orden-item" id="${ordenItem.id}">
				<p>Mesa: </p>
                <p>${ordenItem.mesa}</p>
                <p>Orden: </p>
				<p>${ordenItem.orden}</p>
                <p class="fecha">Fecha: ${ordenItem.date}</p>
                <p class="hora">Hora: ${ordenItem.time}</p>
                <p>Estado: </p>
                <p class="estado">${ordenItem.status}</p>
				<button class="btn-edit">✎</button>
				<button class="btn-deleted">✖</button>
                <div id="content-cantidad">
                <button class="disminuir">-</button>
                <span name="" class="cantidad">0</span>
                <button class="incrementar">+</button>
                </div>
			</li>
            `;
            
            let a = 0;

            const btnDownLi = ordenLi.children[0].children[10].children[0];
                const monto = ordenLi.children[0].children[10].children[1];
            btnDownLi.addEventListener('click', () => {
        a--;
    // a = (a < 10) ? "0" + a : a;
        monto.innerText = a;
        console.log(a);

});

            contentOrdenes.append(ordenLi)
            }

            if (ordenItem.status === 'Completado') {
                ordenLi.innerHTML = `
                <li class="orden-item" id="${ordenItem.id}">
				<p>Mesa: </p>
                <p>${ordenItem.mesa}</p>
                <p>Orden: </p>
				<p>${ordenItem.orden}</p>
                <p class="fecha">Fecha: ${ordenItem.date}</p>
                <p class="hora">Hora: ${ordenItem.time}</p>
                <p>Estado: </p>
                <p class="estado">${ordenItem.status}</p>
				<button class="btn-edit">✎</button>
				<button class="btn-deleted">✖</button>
                <div id="content-cantidad">
                <button class="disminuir">-</button>
                <span name="" class="cantidad">0</span>
                <button class="incrementar">+</button>
            </div>
			</li>
            `;
                

            contentCompletados.append(ordenLi)
            }
        });

        
    } finally {}
};

getOrdenes();
// <p class="estado">${e.target.parentElement.children[6].innerHTML}</p>
// EVENTO PARA EDITAR COMIDAS

contentOrdenes.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-edit')) {
        const id = e.target.parentElement.id;
		const ordenItem = e.target.parentElement;
        // console.log(e.target.parentElement);
        ordenItem.innerHTML = `
        <p>Mesa: </p>
        <p class="mesa-edit">${e.target.parentElement.children[1].innerHTML}</p>
        <p>Orden: </p>
        <p class="orden-edit">${e.target.parentElement.children[3].innerHTML}</p>
        <p class="fecha">${e.target.parentElement.children[4].innerHTML}</p>
        <p class="hora">${e.target.parentElement.children[5].innerHTML}</p>
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
        
        // console.log(estado);
        // console.log(mesa.value);
        // console.log(orden);
        // console.log(estado);
       
        // console.log(hora);
        let PRICE_REGEX =  /^[0-9]/;
        let isValid = PRICE_REGEX.test(mesa.innerHTML);
        if (isValid == true) {
            ordenItem.innerHTML = `
            <p>Mesa: </p>
            <p>${mesa.innerHTML}</p>
            <p>Orden: </p>
            <p>${orden.innerHTML}</p>
            <p class="fecha">${e.target.parentElement.children[4].innerHTML}</p>
            <p class="hora">${e.target.parentElement.children[5].innerHTML}</p>
            <p>Estado: </p>
            <p class="estado">${estado.value}</p>
            <button class="btn-edit">✎</button>
            <button class="btn-deleted">✖</button>
            `;
            await axios.patch(`/api/ordenes/${id}`, {mesa: mesa.innerHTML, orden: orden.innerHTML, status: estado.value});
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


// EVENTO PARA EDITAR CANTIDAD DE PEDIDOS

// let a = 0;

// const btnUp = document.querySelector('.incrementar');
// const btnDown = document.querySelector('.disminuir');
// const cantidad = document.querySelector('.cantidad');

// console.log(contentOrdenes.children);
// btnUp.addEventListener('click', () => {
//     a++;
//     // a = (a < 10) ? "0" + a : a;
//     cantidad.innerText = a;
//     console.log(a);

// });

// btnDown.addEventListener('click', () => {
//     if (a === 0) {
//         // console.log('no');
//     } else {
//     a--;
//     // a = (a < 10) ? "0" + a : a;
//     cantidad.innerText = a;
//     console.log(a);
//     }

// })

