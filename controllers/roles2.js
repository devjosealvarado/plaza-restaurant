const rolesRouter = require('express').Router();
const User = require('../models/user');
const Roles = require('../models/user');
const bcrypt = require('bcrypt');

rolesRouter.post('/', async (request, response) => {
    const { userExist } = request;
    console.log(request);
    if (!userExist) {
        return response.sendStatus(401);
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

    await user.save();

    response.sendStatus(201);
});

module.exports = rolesRouter;