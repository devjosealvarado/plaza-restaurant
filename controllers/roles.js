const rolesRouter = require('express').Router();
const User = require('../models/user');
const Roles = require('../models/rol');
    
rolesRouter.post('/', async (request, response) => {
    const { user } = request;

    if (user) {
        return response.sendStatus(401);
    }

    // const { text } = request.body;
    // const { telefono } = request.body;
    // console.log(telefono);

    const newRol = new Roles({
        firstName,
        lastName,
        ci,
        address,
        email,
        passwordHash,
        rol
    });

    // console.log(request);

    const savedRol = await newRol.save();

    response.status(201).json(savedRol);
});

rolesRouter.get('/', async (request, response) => {
    // COMPRUEBA QUE EL USUARIO INICIO SESION
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }

    const roles = await Roles.find({user: user._id});

    response.status(200).json(roles);

});

rolesRouter.delete('/:id', async (request, response) => {
    // ELIMINA TAREAS
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }

    await Roles.findByIdAndDelete(request.params.id);
    console.log(request.params);
    response.sendStatus(204);

});

// rolesRouter.patch('/:id', async (request, response) => {
//     // EDITA EL CHECK
//     const { user } = request;

//     if (!user) {
//         return response.sendStatus(401);
//     }
//     const { text } = request.body;
//     const { telefono } = request.body;
//     await Contactos.findByIdAndUpdate(request.params.id, {text, telefono});
//     response.sendStatus(200);
// });

module.exports = rolesRouter;