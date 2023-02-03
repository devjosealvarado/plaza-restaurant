const usersEncargadosRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersEncargadosRouter.post('/', async (request, response) => {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
    const {firstName,lastName,ci,address,email, password,rol} = request.body;
    const userExist = await User.findOne({email});
    
    const { user } = request;
    console.log(user);

    if (!user) {
        console.log('no');
        return response.sendStatus(401);
    }
    

    if (user) {
        if (userExist) {
            return response.status(400).json({error: 'El email ya existe'});
        } else if (!PASSWORD_REGEX.test(password)) {
            return response.status(400).json({error: 'La contrasena es erronea'});
        }
    
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
    
        const userM = new User({
            firstName,
            lastName,
            ci,
            address,
            email,
            passwordHash,
            rol,
             
        });
    
        await userM.save();
    
        response.sendStatus(201);
    } 
    // else {
    //     console.log('no');
    //     return response.sendStatus(401);
    // }

});

usersEncargadosRouter.get('/', async (request, response) => {
    // COMPRUEBA QUE EL USUARIO INICIO SESION

    if (request.cookies.accessToken === undefined) {
        return response.sendStatus(401);
    }

    const encargados = await User.find({rol: 'Mesero'});

    response.status(200).json(encargados);

});

usersEncargadosRouter.delete('/:id', async (request, response) => {
    // ELIMINAR ENCARGADO

    if (request.cookies.accessToken === undefined) {
        return response.sendStatus(401);
    }

    await User.findByIdAndDelete(request.params.id);
    response.status(204);

});

module.exports = usersEncargadosRouter;