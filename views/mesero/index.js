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
const montoTotal = document.querySelector('#monto-total');
const btnDeleted = document.querySelector('.btn-deleted')
const mesa = document.querySelector('#mesa-numero');
const contentOrdenes5 = document.querySelector('#ordenes5');

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

            let a = 1;
            console.log();
            const btnDownLi = comida.children[0].children[2].children[0];
            const btnUpLi = comida.children[0].children[2].children[2]
            const monto = comida.children[0].children[2].children[1];

            // console.log(monto);

            btnDownLi.addEventListener('click', () => {

            const montoNumero = parseInt(monto.innerHTML, 10);

            // console.log(montoNumero);
            // a = (a < 10) ? "0" + a : a;
                if (montoNumero === 1) {

                } else {
                    a--;
                    monto.innerText = a;
                }

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
                // console.log(plato);
                // console.log(precio);
                const cantidad = comida.children[0].children[2].children[1].innerHTML;


                const PreviewOrden = document.createElement('li');
                PreviewOrden.innerHTML = `
                    <li class="preview-item">
                    <p>${cantidad + ' ' + plato}</p>
                    <p class="price">${precio}</p>
                    <span class="cantidadTotal" style="display: none;">${cantidad}</span>
                    </li>
                `;

                btnDeleted.style.display = '';
                formBtn.style.display = '';
                mesa.style.display = '';
                ordenPreliminar.append(PreviewOrden)
            });

            // console.log(ordenPreliminar);

            // btnAddPlato.addEventListener('click', e => {
            // console.log('si');;
            // })

            cajaResultados.append(comida);

            btnAddPlato.addEventListener('click', e=> {

                const listP = document.querySelectorAll('.price');
                const cantidad = document.querySelectorAll('.cantidadTotal');
                // console.log(cantidad);
                // console.log(listP);

                let totalNumero=0;
                for(let i = 0; i < listP.length; i++)  {
                    const total = listP[i].innerHTML;
                    console.log(total);
                    const cantidadTotal = cantidad[i].innerHTML;

                    let c = parseInt(cantidadTotal, 10)

                    let h = c*total;

                    parseInt(total, 10)
                    parseInt(totalNumero, 10)
                    totalNumero += h;
                    // console.log(totalNumero);
                    montoTotal.innerHTML = `<span>Monto: $${totalNumero}</span>
                                            <span style="display: none">${totalNumero}</span>`
                };

            });

        });



        // --------- EVENTO PARA ELIMINAR ORDEN PRELIMINAR -------

        // previewItem.addEventListener('click', async e => {
        //     if (e.target.classList.contains('btn-deleted')) {
        //         const id = e.target.parentElement.id;
        //             e.target.parentElement.parentElement.remove();

        //     }
        // })

    });


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
    console.log(data);

    // const busqueda = data.reduce((acc, item) => {
    //     acc[item.mesa] = ++acc[item.mesa] || 0;
    //     return acc;
    // }, {});

    
    // const duplicados = data.filter( (item) => {
    //     return busqueda[item.mesa]
        
    // });
    // console.log(duplicados);

    const z = () => {
        for (let index = 0; index < data.length; index++) {
            const element = data[index].mesa;
            const orden = data[index];
            const posibleLi = document.createElement('li');
            if (element === 5) {
                // console.log(orden.mesa);
                console.log(orden.orden);
                const plato = orden.orden;
                const price = orden.precio
                const amount = orden.cantidad;
                console.log(price);
                console.log(amount);

                // const e = parseInt(amount, 10)
                // const w = parseInt(price, 10);
                const total = price*amount;
                console.log(total);
                // const total = price + amount;
                // console.log(total);

                
                posibleLi.innerHTML = `
                <li class="orden-item">
                    <span>${plato} x $${total}</span>
                </li>

                `;

                contentOrdenes5.append(posibleLi);

            }

            let totalNumeroA=0;
            const dataContentOrdenes5 = contentOrdenes5.children
            for (let index = 1; index < dataContentOrdenes5.length; index++) {
                const items = dataContentOrdenes5[index].children[0].children[0].innerHTML;
                console.log(items);
                const itemsTotal = items.split(' ');
                const cantidadItem = itemsTotal[0];
                const itemsTotalReverse = itemsTotal.reverse();
                const itemsUnique = itemsTotalReverse[0];
                const itemsArray = itemsUnique.split('$');
                // const itemsOnlyN = itemsArray.shift();
                console.log(itemsArray[1]);
                let h = parseInt(cantidadItem, 10)
                let c = parseInt(itemsArray[1], 10)
                parseInt(totalNumeroA, 10)
                let montoFinal = h*c;
                
                totalNumeroA += montoFinal;
                console.log(totalNumeroA);
                
            }
            // if (element === 7) {
            //     // console.log(orden.mesa);
            //     console.log(orden.orden);
            //     const price = orden.precio
            //     const amount = orden.cantidad;
            //     console.log(price);
            //     console.log(amount);

            //     // const e = parseInt(amount, 10)
            //     // const w = parseInt(price, 10);
            //     const total = price*amount;
            //     console.log(total);
            //     // const total = price + amount;
            //     // console.log(total);
            // }

        }
    }

    z();
    

    

    // data.forEach(a => {

    //     // if (a.mesa === 9) {
    //     //     if (a.status === 'Pendiente') {
    //     //         console.log(a);;
    //     //     }
    //     // }
    // })

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

// --------------- EVENTO PARA ELIMINAR COMIDAS -----------------

contentOrdenes.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-deleted')) {
        const id = e.target.parentElement.id;
            e.target.parentElement.parentElement.remove();
        await axios.delete(`/api/ordenes/${id}`)
    }
})

ordenPreliminar.addEventListener('click', e => {
    if (e.target.classList.contains('btn-deleted')) {
        const id = e.target.parentElement.id;
            // e.target.parentElement.remove();
            window.location.reload()

        // await axios.delete(`/api/ordenes/${id}`)
    }
})

// ----------- EVENTO PARA REGISTRAR ORDEN ----------------

formBtn.addEventListener('click', async e=> {
    // console.log(ordenPreliminar.children);
    // console.log(ordenPreliminar.children[1].children[0].innerHTML);
    // console.log(ordenPreliminar.children[4].children[0].children[0].innerHTML);
    // console.log(ordenPreliminar.children[4].children[0].children[1].innerHTML);

    const data = ordenPreliminar.children;
    console.log(data);
    
    console.log(mesa.value);
    

    for (let i = 5; i < data.length; i++) {
        console.log(data[i].children[0].children[0].innerHTML);
        const plato = data[i].children[0].children[0].innerHTML;
        console.log(data[i].children[0].children[1].innerHTML);
        const precioString = data[i].children[0].children[1].innerHTML;
        console.log(montoTotal.children[1].innerHTML);

        let cantidadPlato = plato.split(' ')
        const cantidadPlatoNumber = parseInt(cantidadPlato[0], 10);

        const precio = parseInt(precioString, 10);
        console.log(precio);
        
        

        const newOrden = {
            mesa: mesa.value,
            orden: plato,
            cantidad: cantidadPlatoNumber,
            precio: precio,
            status: 'Pendiente',
            // date: Date.now()
        }
        await axios.post('/api/ordenes', newOrden, { withCredentials: true});
        // const ordenLi = document.createElement('li');
        // ordenLi.innerHTML = `<li class="orden-item" id="">
		// 		<p>Mesa:  </p>
        //         <p>Orden: </p>
		// 		<p>${plato}</p>
               
        //         </div>
		// 	</li>`

        // contentOrdenes.append(ordenLi);


    };

    

})

// formBtn.addEventListener('click', e => {
//     console.log(ordenPreliminar);
// })