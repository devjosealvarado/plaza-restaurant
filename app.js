require('dotenv').config();
const express = require('express');
const app = express();
const moongose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const usersRouter = require('./controllers/users');
const usersEncargadosRouter = require('./controllers/usersEncargados');
const cors = require('cors');
const loginRouter = require('./controllers/login');
// const rolesRouter = require('./controllers/roles2')
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const menuRouter = require('./controllers/menus');
const uuid = require('uuid');
// const upload = multer({ dest: 'uploads/' });
const Menu = require('./models/menu');
const menuPublicRouter = require('./controllers/menuPublic')
const ordenRouter = require('./controllers/ordenes');
const ordenEncargadoRouter = require('./controllers/ordenesEncargado')
const multerRouter = require('./controllers/multer');
const logoutRouter = require('./controllers/logout');



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



// const upload = multer({ dest: 'uploads/' })



// app.post('/profile', upload.single('avatar'), async function (req, res, next) {
//   await console.log(req.body.plato);
//     // req.file es el `avatar` del archivo
//   // req.body tendrá los campos textuales, en caso de haber alguno.
// })




// app.use(express.urlencoded({extended: false}));
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, 'uploads'),
//     filename: (req, file, cb, filename) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
//     }

        
//     // uuid() + path.extname(file.originalname)
// });
// app.use(multer({
//     storage: storage
// }).single('image'));
// const upload = multer({ storage: storage });


// app.post('/api/img', upload.single('image'), function (req, res, next) {
//     console.log(req);
    
// })




// Routes backend
app.use('/api/img', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
// app.use('/api/roles2', rolesRouter);
app.use('/api/menus', auth, menuRouter);
app.use('/api/ordenes', auth, ordenRouter);
app.use('/api/ordenesEncargado', auth, ordenEncargadoRouter);
app.use('/api/usersEncargados', auth, usersEncargadosRouter);
app.use('/api/menuPublic', menuPublicRouter);

app.use('/api/multer', multerRouter);

// Routes frontend
app.use('/', express.static(path.join(__dirname, 'views', 'home')));
app.use('/signup', express.static(path.join(__dirname, 'views', 'signup')));
app.use('/login', express.static(path.join(__dirname, 'views', 'login')));
app.use('/admin/:id', express.static(path.join(__dirname, 'views', 'admin')));
app.use('/admin/rol', express.static(path.join(__dirname, 'views', 'admin','rol')));
app.use('/admin/add-menu', express.static(path.join(__dirname, 'views', 'admin','add-menu')));
app.use('/mesero/:id/add-menu', express.static(path.join(__dirname, 'views', 'mesero','add-menu')));
app.use('/mesero/:id', express.static(path.join(__dirname, 'views', 'mesero')));
app.use('/encargado/:id/add-menu', express.static(path.join(__dirname, 'views', 'encargado','add-menu')));
app.use('/encargado/:id', express.static(path.join(__dirname, 'views', 'encargado')));
app.use('/home/:id', express.static(path.join(__dirname, 'views', 'home')));
app.use('/cliente/:id', express.static(path.join(__dirname, 'views', 'cliente')));
// app.use('*', express.static(path.join(__dirname, 'views', '404')));

module.exports = app;