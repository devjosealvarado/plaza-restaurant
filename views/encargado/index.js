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

// ------ EVENTO PARA CREAR LOS CONTENEDORES DE CADA MESERO -----
const getUsers = async () => {
    const  { data }  = await axios.get('/api/usersEncargados')
        console.log(data);

        data.forEach(mesero => {
            console.log(mesero.id);
            const contentMesero = document.createElement('div');
            contentMesero.setAttribute('id', `${mesero.id}`)
            contentMesero.innerHTML = `
                <button class="btn-deleted">✖</button>
                <p style="text-align: center;" id="mesa6${mesero.id}"></p>
                <p style="text-align: center;" id="monto-total6${mesero.id}"></p>
                <p style="text-align: center;" id="fecha6${mesero.id}"></p>
                <p style="text-align: center;" id="hora6${mesero.id}"></p>
            `
            contenedor.append(contentMesero)
        });
        
}

getUsers();

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
				<p>Mesero:${data.mesero}</p>
                <p>Mesa: </p>
                <p>${data.mesa}</p>
                <p>Orden: </p>
				<p>${data.orden}</p>
                <p class="fecha">Fecha: ${data.date}</p>
                <p class="hora">Hora: ${data.time}</p>
                <p class="estado">${data.status}</p>
				<button class="btn-edit">✎</button>
				<button class="btn-deleted">✖</button>
			</li>
            `;

            contentOrdenes.append(ordenLi)
        
    } finally {}
})



const getOrdenes = async () => {
    while (contentOrdenes.firstChild) {
        contentOrdenes.removeChild(contentOrdenes.firstChild)
    }

    // const newOrden = {
    //     mesa: mesaInput.value,
    //     orden: ordenInput.value
    //     // image: imageRef.value
    // }

    try {
        const { data } = await axios.get('/api/ordenesEncargado');
    console.log(data);

        

    const z = () => {
        for (let index = 0; index < data.length; index++) {
            const userID = data[index].user;
            const element = data[index].mesa;
            const orden = data[index];
            const posibleLi = document.createElement('li');
            const btnDeletedA = document.createElement('button')
            btnDeletedA.setAttribute('class', 'btn-deleted');
            btnDeletedA.innerHTML = '✖'
            // console.log(btnDeletedA);
            if (userID === '63c1dd1a05b92b3b431eb2fc') {
                if (element === 5) {
                    contentOrdenes5.style.display = '';
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
                    console.log(mesa5);
                mesa5.innerHTML = `Mesa: ${orden.mesa}`;
                fecha5.innerHTML = `Fecha: ${orden.date}`;
                hora5.innerHTML = `Hora: ${orden.time}`;
                posibleLi.innerHTML = `
                <li class="orden-item" id="${orden.id}">
                    <span>${plato} x $${price}</span>
                </li>

                `;
                
                contentOrdenes5.append(posibleLi);
                }

                let totalNumeroA=0;
            const dataContentOrdenes5 = contentOrdenes5.children
            for (let index = 5; index < dataContentOrdenes5.length; index++) {
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
                montoTotal5.innerHTML = `Monto: $${totalNumeroA}`
                
            }
                
                if (element === 6) {
                    // console.log(orden.mesa);
                    contentOrdenes6.style.display = '';
                    // console.log(orden.orden);
                    const plato = orden.orden;
                    const price = orden.precio
                    const amount = orden.cantidad;
                    // console.log(price);
                    // console.log(amount);
    
                    // const e = parseInt(amount, 10)
                    // const w = parseInt(price, 10);
                    const total = price*amount;
                    // console.log(total);
                    // const total = price + amount;
                    // console.log(total);
    
                    mesa6.innerHTML = `Mesa: ${orden.mesa}`;
                    fecha6.innerHTML = `Fecha: ${orden.date}`;
                    hora6.innerHTML = `Hora: ${orden.time}`;
                    posibleLi.innerHTML = `
                    <li class="orden-item" id="${orden.id}">
                        <span>${plato} x $${price}</span>
                    </li>
    
                    `;
    
                    contentOrdenes6.append(posibleLi);
    
                }

                let totalNumeroB=0;
                const dataContentOrdenes6 = contentOrdenes6.children
                for (let index = 5; index < dataContentOrdenes6.length; index++) {
                   const items = dataContentOrdenes6[index].children[0].children[0].innerHTML;
                    // console.log(items);
                    const itemsTotal = items.split(' ');
                    const cantidadItem = itemsTotal[0];
                    const itemsTotalReverse = itemsTotal.reverse();
                    const itemsUnique = itemsTotalReverse[0];
                    const itemsArray = itemsUnique.split('$');
                    // const itemsOnlyN = itemsArray.shift();
                    // console.log(itemsArray[1]);
                    let h = parseInt(cantidadItem, 10)
                    let c = parseInt(itemsArray[1], 10)
                    parseInt(totalNumeroB, 10)
                    let montoFinal = h*c;
                    
                    totalNumeroB += montoFinal;
                     // console.log(totalNumeroB);
                    montoTotal6.innerHTML = `Monto: $${totalNumeroB}`
                
                }
            }

            if (userID === '63c0d934e5474132d8a106c9') {
                if (element === 5) {
                    contentOrdenes5B.style.display = '';
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

                    mesa5.innerHTML = `Mesa: ${orden.mesa}`;
                    fecha5.innerHTML = `Fecha: ${orden.date}`;
                    hora5.innerHTML = `Hora: ${orden.time}`;
                    posibleLi.innerHTML = `
                    <li class="orden-item" id="${orden.id}">
                        <span>${plato} x $${price}</span>
                    </li>

                    `;
                
                    contentOrdenes5B.append(posibleLi);
                }

                let totalNumeroA=0;
                const dataContentOrdenes5 = contentOrdenes5B.children
                for (let index = 5; index < dataContentOrdenes5.length; index++) {
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
                    montoTotal5B.innerHTML = `Monto: $${totalNumeroA}`
                    
                }
                
                if (element === 6) {
                    // console.log(orden.mesa);
                    contentOrdenes6B.style.display = '';
                    // console.log(orden.orden);
                    const plato = orden.orden;
                    const price = orden.precio
                    const amount = orden.cantidad;
                    // console.log(price);
                    // console.log(amount);
    
                    // const e = parseInt(amount, 10)
                    // const w = parseInt(price, 10);
                    const total = price*amount;
                    // console.log(total);
                    // const total = price + amount;
                    // console.log(total);
    
                    mesa6.innerHTML = `Mesa: ${orden.mesa}`;
                    fecha6.innerHTML = `Fecha: ${orden.date}`;
                    hora6.innerHTML = `Hora: ${orden.time}`;
                    posibleLi.innerHTML = `
                    <li class="orden-item" id="${orden.id}">
                        <span>${plato} x $${price}</span>
                    </li>
    
                    `;
    
                    contentOrdenes6B.append(posibleLi);
    
                }

                let totalNumeroB=0;
                const dataContentOrdenes6 = contentOrdenes6B.children
                for (let index = 5; index < dataContentOrdenes6.length; index++) {
                   const items = dataContentOrdenes6[index].children[0].children[0].innerHTML;
                    // console.log(items);
                    const itemsTotal = items.split(' ');
                    const cantidadItem = itemsTotal[0];
                    const itemsTotalReverse = itemsTotal.reverse();
                    const itemsUnique = itemsTotalReverse[0];
                    const itemsArray = itemsUnique.split('$');
                    // const itemsOnlyN = itemsArray.shift();
                    // console.log(itemsArray[1]);
                    let h = parseInt(cantidadItem, 10)
                    let c = parseInt(itemsArray[1], 10)
                    parseInt(totalNumeroB, 10)
                    let montoFinal = h*c;
                    
                    totalNumeroB += montoFinal;
                     console.log(totalNumeroB);
                    montoTotal6B.innerHTML = `Monto: $${totalNumeroB}`
                
                }

                
            }

            

            // ----------------------------------------------------

            // if (element === 6) {
            //     // console.log(orden.mesa);
            //     contentOrdenes6.style.display = '';
            //     // console.log(orden.orden);
            //     const plato = orden.orden;
            //     const price = orden.precio
            //     const amount = orden.cantidad;
            //     // console.log(price);
            //     // console.log(amount);

            //     // const e = parseInt(amount, 10)
            //     // const w = parseInt(price, 10);
            //     const total = price*amount;
            //     // console.log(total);
            //     // const total = price + amount;
            //     // console.log(total);

            //     mesa6.innerHTML = `Mesa: ${orden.mesa}`;
            //     fecha6.innerHTML = `Fecha: ${orden.date}`;
            //     hora6.innerHTML = `Hora: ${orden.time}`;
            //     posibleLi.innerHTML = `
            //     <li class="orden-item" id="${orden.id}">
            //         <span>${plato} x $${total}</span>
            //     </li>

            //     `;

            //     contentOrdenes6.append(posibleLi);

            // }

            
        }
    }

    z();
    


        // data.forEach(ordenItem => {
        //     const ordenLi = document.createElement('li');
        //     // console.log(ordenLi);
        //     ordenLi.innerHTML = `
        //         <li class="orden-item" id="${ordenItem.id}">
		// 		<p>Mesero:${ordenItem.mesero}</p>
        //         <p>Mesa: </p>
        //         <p>${ordenItem.mesa}</p>
        //         <p>Orden: </p>
		// 		<p>${ordenItem.orden}</p>
        //         <p class="fecha">Fecha: ${ordenItem.date}</p>
        //         <p class="hora">Hora: ${ordenItem.time}</p>
        //         <p>Estado: </p>
        //         <p class="estado">${ordenItem.status}</p>
		// 		<button class="btn-edit">✎</button>
		// 		<button class="btn-deleted">✖</button>
		// 	</li>
        //     `;

        //     contentOrdenes.append(ordenLi)
        // });



        
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


