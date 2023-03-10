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
const montoTotal5 = document.querySelector('#monto-total5');
const montoTotal6 = document.querySelector('#monto-total6');
const btnDeleted = document.querySelector('.btn-deleted')
const mesa = document.querySelector('#mesa-numero');
const mesa5 = document.querySelector('#mesa5');
const mesa6 = document.querySelector('#mesa6');
const contentOrdenes5 = document.querySelector('#ordenes5');
const contentOrdenes6 = document.querySelector('#ordenes6');
const fecha5 = document.querySelector('#fecha5');
const hora5 = document.querySelector('#hora5');
const fecha6 = document.querySelector('#fecha6');
const hora6 = document.querySelector('#hora6');


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
                <div class="comida-item" id="${meal.id}">
				<p>${meal.plato} $${meal.price}</p>
				<p style="display: none">$${meal.price}</p>
                <span style="display: none">${meal.price}</span>
                <div id="content-cantidad">
                    <button class="disminuir">-</button>
                    <span name="" class="cantidad">1</span>
                    <button class="incrementar">+</button>
                </div>
                <button class="btnAddPlato">Agregar</button>
			    </div>
            `;

            let a = 1;
            console.log();
            const btnDownLi = comida.children[0].children[3].children[0];
            const btnUpLi = comida.children[0].children[3].children[2]
            const monto = comida.children[0].children[3].children[1];

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
            const precio = comida.children[0].children[2].innerHTML
            console.log(precio);

            btnUpLi.addEventListener('click', () => {
                a++;
                monto.innerText = a;
            });

//------------EVENTO PARA AÑADIR A VISTA PREVIA DEL PLATO ---------//

            // const montoModificado = comida.children[0].children[2].children[1].innerHTML;
            const btnAddPlato = comida.children[0].children[4];


            btnAddPlato.addEventListener('click', e=> {
                // console.log(plato);
                // console.log(precio);
                const cantidad = comida.children[0].children[3].children[1].innerHTML;
                console.log(cantidad);


                const PreviewOrden = document.createElement('li');
                PreviewOrden.innerHTML = `
                    <div class="preview-item">
                    <span>${cantidad + ' ' + plato}</span>
                    <span class="price" style="display: none">${precio}</span>
                    <span class="cantidadTotal" style="display: none;">${cantidad}</span>
                    </div>
                `;

                // btnDeleted.style.display = '';
                formBtn.style.display = '';
                mesa.style.display = '';
                ordenPreliminar.style.display = '';
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


const getOrdenes = async () => {

    try {
        const { data } = await axios.get('/api/ordenes');
        console.log(data);

        data.forEach(orden => {
            console.log(orden.mesa);
            const mesa = orden.mesa;
            console.log(orden.precio);
            const monto = orden.precio;
            console.log(orden.date);
            const fecha = orden.date;
            console.log(orden.time);
            const hora = orden.time;
            console.log(orden.orden);
            const platos = orden.orden
            console.log(orden.status);
            const status = orden.status;
            if (status === 'Completado') {
                const plato = document.createElement('div')
            plato.innerHTML = `
            <div class="orden-item completado">
                <span>Mesa: ${mesa}</span>
                <span>Orden: ${platos}</span>
                <span>Monto: $${monto}</span>
                <span class="fecha">Fecha: ${fecha}</span>
                <span class="hora">Hora: ${hora}</span>
                <span>Estado: ${status}</span>
            </div>
            `;

            contentOrdenes.append(plato);
            } else {
                const plato = document.createElement('div')
            plato.innerHTML = `
            <div class="orden-item">
                <span>Mesa: ${mesa}</span>
                <span>Orden: ${platos}</span>
                <span>Monto: $${monto}</span>
                <span class="fecha">Fecha: ${fecha}</span>
                <span class="hora">Hora: ${hora}</span>
                <span>Estado: ${status}</span>
            </div>
            `;

            contentOrdenes.append(plato);
            }
            
        })



   

    } finally {}
};

getOrdenes();
// <p class="estado">${e.target.parentElement.children[6].innerHTML}</p>
// EVENTO PARA EDITAR COMIDAS

// contentOrdenes.addEventListener('click', async e => {
//     if (e.target.classList.contains('btn-edit')) {
//         const id = e.target.parentElement.id;
// 		const ordenItem = e.target.parentElement;
//         // console.log(e.target.parentElement);
//         ordenItem.innerHTML = `
//         <p>Mesa: </p>
//         <p class="mesa-edit">${e.target.parentElement.children[1].innerHTML}</p>
//         <p>Orden: </p>
//         <p class="orden-edit">${e.target.parentElement.children[3].innerHTML}</p>
//         <p class="fecha">${e.target.parentElement.children[4].innerHTML}</p>
//         <p class="hora">${e.target.parentElement.children[5].innerHTML}</p>
//         <p>Estado: </p>
//         <select name="" id="" class="status">
//                 <option value="Pendiente">Pendiente</option>
//                 <option value="Completado">Completado</option>
//             </select>
//         <button class="btn-editing">✔</button>
//         `;
//     } else if (e.target.classList.contains('btn-editing')) {
//         const id = e.target.parentElement.id;
// 		const ordenItem = e.target.parentElement;
//         const plato = document.querySelector('.meal-edit');
// 		const price = document.querySelector('.price-edit');

//         const mesa = document.querySelector('.mesa-edit');
//         const orden = document.querySelector('.orden-edit');
//         const estado = document.querySelector('.status')
//         // let estado = false;

//         // console.log(estado);
//         // console.log(mesa.value);
//         // console.log(orden);
//         // console.log(estado);

//         // console.log(hora);
//         let PRICE_REGEX =  /^[0-9]/;
//         let isValid = PRICE_REGEX.test(mesa.innerHTML);
//         if (isValid == true) {
//             ordenItem.innerHTML = `
//             <p>Mesa: </p>
//             <p>${mesa.innerHTML}</p>
//             <p>Orden: </p>
//             <p>${orden.innerHTML}</p>
//             <p class="fecha">${e.target.parentElement.children[4].innerHTML}</p>
//             <p class="hora">${e.target.parentElement.children[5].innerHTML}</p>
//             <p>Estado: </p>
//             <p class="estado">${estado.value}</p>
//             <button class="btn-edit">✎</button>
//             <button class="btn-deleted">✖</button>
//             `;
//             await axios.patch(`/api/ordenes/${id}`, {mesa: mesa.innerHTML, orden: orden.innerHTML, status: estado.value});
//         }
//     }
// });

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
            // window.location.reload()

        // await axios.delete(`/api/ordenes/${id}`)
    }
})


formBtn.addEventListener('click', async e=> {
    // console.log(ordenPreliminar.children);
    // console.log(ordenPreliminar.children[1].children[0].innerHTML);
    // console.log(ordenPreliminar.children[4].children[0].children[0].innerHTML);
    // console.log(ordenPreliminar.children[4].children[0].children[1].innerHTML);

    const data = ordenPreliminar.children;
    console.log(data);
    
    // console.log(mesa.value);
    
    let platoArray = []
    let precioArray = []
    
    

    for (let i = 4; i < data.length; i++) {
        // console.log(data[i].children[0].children[0].innerHTML);
        const plato = data[i].children[0].children[0].innerHTML;
        // console.log(data[i].children[0].children[1].innerHTML);
        const precioString = data[i].children[0].children[1].innerHTML;
        // console.log(montoTotal.children[1].innerHTML);

        let cantidadPlato = plato.split(' ')
        const cantidadPlatoNumber = parseInt(cantidadPlato[0], 10);
        // console.log(cantidadPlatoNumber);

        const precio = parseInt(precioString, 10);
        // console.log(precio);

        const multiplicacion = cantidadPlatoNumber*precio
        
        platoArray.push(plato)
        precioArray.push(multiplicacion)
        

    };
    
    console.log(platoArray);
    const platoDefinito = platoArray.join(', ')
    const sumatoriaPrecio = precioArray.reduce((a,b) => a + b, 0)
    console.log(sumatoriaPrecio);

    if (mesa.value) {
        const newOrden = {
            mesa: mesa.value,
            orden: platoDefinito,
            cantidad: 0,
            precio: sumatoriaPrecio,
            status: 'Pendiente',
            // date: Date.now()
        }
        await axios.post('/api/ordenes', newOrden, { withCredentials: true});
        window.location.reload()
    } else {
        alert('Especifíca el número de mesa')
    }
})

