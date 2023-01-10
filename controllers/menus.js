const menuRouter = require('express').Router();
const User = require('../models/user');
const Menu = require('../models/menu');
const { all, request, response } = require('../app');
// const path = require('path');
// const express = require('express');
// const multer = require('multer');
// menuRouter.use(express.urlencoded({extended: false}));




menuRouter.post('/', async (request, response) => {
    // console.log(request);

    if (request.cookies.accessToken) {
        console.log('si');

        const {plato, price} = request.body;
        
        

        const newMenu = new Menu({
            plato,
            price,
            file: {}
    });

    newMenu.file = {
        url: 'api/img/a.jpg'
    }

    const savedMenu = await newMenu.save();

    response.status(201).json(savedMenu);
    
    } else {
        console.log('no');
        return response.sendStatus(401);
    }

    
})

// OBTENER PLATOS

menuRouter.get('/', async (request, response) => {
    
    const menus = await Menu.find(all);
    
    response.status(200).json(menus);
})

// ELIMINAR PLATOS

menuRouter.delete('/:id', async (request, response) => {
    // console.log(request.cookies);
    
    console.log(request.cookies.accessToken);
    
    if (request.cookies.accessToken) {
        await Menu.findByIdAndDelete(request.params.id);
        console.log(request.params);
        response.sendStatus(204);
    } else {
        console.log('no');
        return response.sendStatus(401);
    }

    // if(request.cookies) {
    //     console.log('sin permiso');
    // }

    // const { user } = request;

    // if (!user) {
    //     return response.sendStatus(401);
    // }

    

    
})

// EDITAR PLATOS

menuRouter.patch('/:id', async (request, response) => {
    // EDITA EL CHECK
    // const { user } = request;


    // if (!user) {
    //     return response.sendStatus(401);
    // }

    console.log();
    
    if (request.cookies.accessToken) {
        const { plato } = request.body;
        const { price } = request.body;
        await Menu.findByIdAndUpdate(request.params.id, {plato, price});
        response.sendStatus(200);
    } else {
        return response.sendStatus(401);
    }
    
});



// const upload = multer({ dest: 'uploads/' })



// menuRouter.post('/profile', upload.single('avatar'), async function (req, res, next) {
//   await console.log(req.body.plato);
//     // req.file es el `avatar` del archivo
//   // req.body tendrá los campos textuales, en caso de haber alguno.
// })


// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../views/img/uploads'),
//     filename: (req, file, cb, filename) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
//     }

        
//     // uuid() + path.extname(file.originalname)
// });

// const upload = multer({ storage: storage });

// menuRouter.post('../views/img/uploads', upload.single('image'), function (req, res, next) {
//     console.log(req);
    
// })

// menuRouter.get('/', (req, res) => {
//     // res.send('Index page');
// });

// menuRouter.get('/upload', (req, res) => {
//     // res.render('upload');
// });

// menuRouter.post('/', async (req, res) => {
//     const menu = new Menu();
//     console.log(req);

//     plato = req.body.plato;
//     price = req.body.price;

//     // menu.plato= req.body.plato;
//     // menu.price = req.body.price;
//     // menu.filename = req.file.filename;
//     // menu.path = 'views/img/uploads' + req.file.filename;
//     // menu.originalname = req.file.originalname;
//     // menu.mimetype = req.file.mimetype;
//     // menu.size = req.file.size;

//     await menu.save();

//     // res.redirect('/');
// });

// menuRouter.get('/image/:id', (req, res) => {
//     // res.render('Profile iMage');
// });

// menuRouter.get('/image/:id/delete', (req, res) => {
//     // res.render('Image deleted');
// });

module.exports = menuRouter;