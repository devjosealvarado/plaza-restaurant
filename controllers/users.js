const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

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
        rol,
         
    });

    await user.save();
    const savedUser = await user.save();

    const userForToken = {
        id: savedUser._id,
        email: savedUser.email
    }

    const emailToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN, {expiresIn: '1d'});

    const transporter = nodemailer.createTransport({
    host: process.env.GOOGLE_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GOOGLE_USER, // generated ethereal user
      pass: process.env.GOOGLE_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.GOOGLE_USER, // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<p>Verificar</p> <a href="http://localhost:5500/verificar/${savedUser.id}">Aqui</a>`, // html body
  });

    response.sendStatus(201);

});

usersRouter.patch('/:id', async (request, response) => {
    await User.findByIdAndUpdate(request.params.id, { verified: true})

    return response.status(200).json(true);
});

usersRouter.get('/', async (request, response) => {
    // COMPRUEBA QUE EL USUARIO INICIO SESION

    if (request.cookies.accessToken === undefined) {
        return response.sendStatus(401);
    }

    const encargados = await User.find(this.all);
    // console.log(typeof(encargados));
    // const meseros = await User.find({rol: 'Mesero'});
    // const  cargos  = (encargados + ',' + meseros)

    // console.log(encargados);

    response.status(200).json(encargados);

});

usersRouter.delete('/:id', async (request, response) => {
    // ELIMINAR ENCARGADO

    if (request.cookies.accessToken === undefined) {
        return response.sendStatus(401);
    }

    await User.findByIdAndDelete(request.params.id);
    response.status(204);

});

module.exports = usersRouter;