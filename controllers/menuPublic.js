const menuPublicRouter = require('express').Router();
const User = require('../models/user');
const Menu = require('../models/menu');
const { all, request, response } = require('../app');

menuPublicRouter.get('/', async (request, response) => {
    
    const menus = await Menu.find(all);
    
    response.status(200).json(menus);
});

module.exports = menuPublicRouter;