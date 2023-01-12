const ordenRouter = require('express').Router();
const User = require('../models/user');
const Orden = require('../models/orden');

ordenRouter.post('/', async (request, response) => {
    const { user } = request;
    console.log(user);
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
        console.log('si');

        const {mesa, orden, status} = request.body;

        const newOrden = new Orden({
            mesa,
            orden,
            status,
            user: user._id,
            date: fechaActual,
            time: timeActual
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
    const ordenes = await Orden.find({user: user._id});
    // console.log(ordenes);
    response.status(200).json(ordenes);
});

// EDITAR ORDENES 

ordenRouter.patch('/:id', async (request, response) => {
    // EDITA EL CHECK
    // const { user } = request;


    // if (!user) {
    //     return response.sendStatus(401);
    // }

    const { user } = request;
    console.log(user);

    console.log();
    
    if (user) {

        const {mesa, orden, status} = request.body;
        console.log(mesa, orden, status );
        // await Orden.findByIdAndUpdate(request.params.id, {plato, price});
        // response.sendStatus(200);
    } else {
        return response.sendStatus(401);
    }
    
});

module.exports = ordenRouter;