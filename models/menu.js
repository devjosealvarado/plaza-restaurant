const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: String,
    fileName: String,
    type: String
})

const menuSchema = new mongoose.Schema({
    plato: String,
    price: String,

    file: fileSchema,
    // filename: String,
    // path: String,
    // originalname: String,
    // mimetype:String,
    // size: Number,
    // created_at: Date
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

menuSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.passwordHash;
    }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;