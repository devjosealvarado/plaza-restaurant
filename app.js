require('dotenv').config();
const express = require('express');
const app = express();
const moongose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const usersRouter = require('./controllers/users');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const auth = require('./middleware/auth');

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
app.use(express.json());
app.use(morgan('tiny'));

// Routes backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

// Routes frontend
app.use('/', express.static(path.join(__dirname, 'views', 'home')));
app.use('/signup', express.static(path.join(__dirname, 'views', 'signup')));
app.use('/login', express.static(path.join(__dirname, 'views', 'login')));
app.use('/app/:id', express.static(path.join(__dirname, 'views', 'app')));
app.use('*', express.static(path.join(__dirname, 'views', '404')));

module.exports = app;