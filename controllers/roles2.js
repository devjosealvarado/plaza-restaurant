const rolesRouter = require('express').Router();
const User = require('../models/user');
const Roles = require('../models/rol');
const bcrypt = require('bcrypt');

rolesRouter.post('/', async (request, response) => {
    // const { userExist } = request;
    const {firstName,lastName,ci,address,email, password,rol} = request.body;
    const userExist = await User.findOne({email});
    
    
    if (userExist) {
        return response.status(400).json({error: 'El email ya existe'});
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new Roles({
        firstName,
        lastName,
        ci,
        address,
        email,
        passwordHash,
        rol
        
    });

    // console.log(request);

    // const savedRol = await user.save();

    // response.status(201).json(savedRol);

    await user.save();

    response.sendStatus(201);
});

module.exports = rolesRouter;