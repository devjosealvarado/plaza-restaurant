const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


loginRouter.post('/', async (request, response) => {
    const {email, password} = request.body;
    const userExist = await User.findOne({email});
    if (!userExist) {
        return response.status(400).json({error: 'El email o contraseña son invalidos'});
    } 
    const passwordValidation = await bcrypt.hash(password, userExist.passwordHash);
    if (!passwordValidation) {
        return response.status(400).json({error: 'El email o contraseña son invalidos'})
    }

    const userForToken = {
        id: userExist._id,
        email: userExist.email
    }

    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN, {expiresIn: '1d'});

    response.cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: false,
        httpOnly: true
    })

    response.status(200).json(userExist);
});

module.exports = loginRouter;