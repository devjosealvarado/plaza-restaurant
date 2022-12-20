const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response) => {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
    const {firstName,lastName,ci,address,email, password,rol} = request.body;
    const userExist = await User.findOne({email});

    if (userExist) {
        return response.status(400).json({error: 'El email ya existe'});
    } else if (!PASSWORD_REGEX.test(password)) {
        return response.status(400).json({error: 'La contrasena es erronea'});
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        firstName,
        lastName,
        ci,
        address,
        email,
        passwordHash,
        rol
        
    });

    await user.save();

    response.sendStatus(201);

});

usersRouter.get('/', async (request, response) => {
    // COMPRUEBA QUE EL USUARIO INICIO SESION
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }

    const contactos = await Contactos.find({user: user._id});

    response.status(200).json(contactos);

});

module.exports = usersRouter;