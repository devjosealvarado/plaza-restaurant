const ordenEncargadoRouter = require('express').Router();
const Orden = require('../models/orden');

// OBTENER TODAS LA ORDENES PARA EL ENCARGADO

ordenEncargadoRouter.get('/', async (request, response) => {
    const { user } = request; 
    // console.log(user);   
    const ordenes = await Orden.find(this.all);
    // console.log(ordenes);
    response.status(200).json(ordenes);
});

module.exports = ordenEncargadoRouter;