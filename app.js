require('dotenv').config();
const express = require('express');
const app = express();
const moongose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const usersRouter = require('./controllers/users');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const rolesRouter = require('./controllers/roles2')
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const menuRouter = require('./controllers/menu');


(async () => {
    try {
        await moongose.connect(process.env.MONGO_URI_TEST)
        console.log('Conectado a Mongo DB');
    } catch (error) {
        console.log(error);
    }
})();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: false}));
multer.diskStorage({
    filename: (req, file, cb, filename)
})
app.use(multer({dest: path.join(__dirname, 'views/img/uploads')}).single('image'));


// Routes backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/roles2', rolesRouter);
app.use('/api/menu', menuRouter);

// Routes frontend
app.use('/', express.static(path.join(__dirname, 'views', 'home')));
app.use('/signup', express.static(path.join(__dirname, 'views', 'signup')));
app.use('/login', express.static(path.join(__dirname, 'views', 'login')));
app.use('/admin/:id', express.static(path.join(__dirname, 'views', 'admin')));
app.use('/admin/rol', express.static(path.join(__dirname, 'views', 'admin','rol')));
app.use('/admin/add-menu', express.static(path.join(__dirname, 'views', 'admin','add-menu')));
app.use('/encargado/:id', express.static(path.join(__dirname, 'views', 'encargado')));
app.use('/home/:id', express.static(path.join(__dirname, 'views', 'home')));
app.use('*', express.static(path.join(__dirname, 'views', '404')));

module.exports = app;