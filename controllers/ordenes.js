const ordenRouter = require('express').Router();
const User = require('../models/user');
const Orden = require('../models/orden');

ordenRouter.post('/', async (request, response) => {
    const { user } = request;
    console.log(user);
    

    if (user) {
        console.log('si');

        const {mesa, orden, status} = request.body;

        const newOrden = new Orden({
            mesa,
            orden,
            status,
            user: user._id,
            date
    });
    const savedOrden = await newOrden.save();

    response.status(201).json(savedOrden);
    
    
    } else {
        console.log('no');
        return response.sendStatus(401);
    }

    
});

ordenRouter.get('/', async (request, response) => {
    const { user } = request;    
    const ordenes = await Orden.find({user: user._id});
    // console.log(ordenes);
    response.status(200).json(ordenes);
})

module.exports = ordenRouter;