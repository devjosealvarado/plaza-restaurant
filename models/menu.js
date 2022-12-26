const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    plato: String,
    price: String,
    
    img: {
        data: Buffer,
        contentType: String
    }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;