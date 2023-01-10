const ordenRouter = require('express').Router();
const User = require('../models/user');
const Orden = require('../models/orden');

ordenRouter.post('/', async (request, response) => {
    const { user } = response;
    console.log(user);

    if (request.cookies.accessToken) {
        console.log('si');

        const {mesa, orden, status} = request.body;

        const newOrden = new Orden({
            mesa,
            orden,
            status,
            // user: user._id,
    });

    const savedOrden = await newOrden.save();

    response.status(201).json(savedOrden);
    
    } else {
        console.log('no');
        return response.sendStatus(401);
    }

    
});

module.exports = ordenRouter;