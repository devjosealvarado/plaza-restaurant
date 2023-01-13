const ordenRouter = require('express').Router();
const User = require('../models/user');
const Orden = require('../models/orden');

ordenRouter.post('/', async (request, response) => {
    const { user } = request;
    // console.log(user);
    const fecha = new Date();
    // console.log(typeof(fecha));
    const fechaYear = fecha.getFullYear().toString();
    const fechaMes = (fecha.getMonth() + 1).toString();
    const fechaDay = fecha.getDate().toString();
    const fechaHour = fecha.getHours().toString();
    const fechaMinutes = fecha.getMinutes().toString();
    const fechaSeconds = fecha.getSeconds().toString();
    

    const fechaActual = fechaDay + '-' + fechaMes + '-' + fechaYear;
    const timeActual = fechaHour + ':' + fechaMinutes + ':' + fechaSeconds;
    if (user) {
        // console.log('si');

        const {mesa, orden, status} = request.body;

        const newOrden = new Orden({
            mesa,
            orden,
            status,
            user: user._id,
            date: fechaActual,
            time: timeActual,
            mesero: user.firstName + ' ' + user.lastName
    });
    const savedOrden = await newOrden.save();

    response.status(201).json(savedOrden);
    
    
    } else {
        console.log('no');
        return response.sendStatus(401);
    }

    
});

// OBTENER ORDENES

ordenRouter.get('/', async (request, response) => {
    const { user } = request; 
    // console.log(user);   
    const ordenes = await Orden.find({user: user._id});
    // console.log(ordenes);
    response.status(200).json(ordenes);
});

// EDITAR ORDENES 

ordenRouter.patch('/:id', async (request, response) => {
    // EDITA EL CHECK

    const { user } = request;
 
    
    if (user) {

        const {mesa, orden, status} = request.body;
        console.log(mesa, orden );
        await Orden.findByIdAndUpdate(request.params.id, {mesa, orden, status});
        response.sendStatus(200);
    } else {
        return response.sendStatus(401);
    }
    
});

// ELIMINAR ORDENES

ordenRouter.delete('/:id', async (request, response) => {
    // console.log(request.cookies);
    const { user } = request;
    // console.log(user);

    // console.log(request.cookies.accessToken);
    
    if (user) {
        await Orden.findByIdAndDelete(request.params.id);
        console.log(request.params);
        response.sendStatus(204);
    } else {
        console.log('no');
        return response.sendStatus(401);
    }

    // if(request.cookies) {
    //     console.log('sin permiso');
    // }

    // const { user } = request;

    // if (!user) {
    //     return response.sendStatus(401);
    // }

    

    
})

module.exports = ordenRouter;