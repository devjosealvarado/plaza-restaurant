const menuRouter = require('express').Router();
const User = require('../models/user');
const Menus = require('../models/menu');

menuRouter.get('/', (req, res) => {
    res.send('Index page');
});

menuRouter.get('/upload', (req, res) => {
    res.render('upload');
});

menuRouter.post('/upload', (req, res) => {
    console.log(req.file);
    res.render('uploaded');
});

menuRouter.get('/image/:id', (req, res) => {
    res.render('Profile iMage');
});

menuRouter.get('/image/:id/delete', (req, res) => {
    res.render('Image deleted');
});

module.exports = menuRouter;