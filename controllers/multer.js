const multerRouter = require('express').Router();
const multer = require('multer');
const express = require('express');
const path = require('path');

multerRouter.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../img/uploads'),
    filename: (req, file, cb, filename) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }

        
    // uuid() + path.extname(file.originalname)
});
multerRouter.use(multer({
    storage: storage
}).single('image'));
const upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/' });
multerRouter.post('/api/img', upload.single('image'), function (req, res, next) {
    console.log(req);
    
});

module.exports = multerRouter;