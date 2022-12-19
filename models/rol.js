const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    ci: String,
    address: String,
    email: String,
    passwordHash: String,
    rol: String,
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

rolSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
});

const Rol = mongoose.model('Rol', rolSchema);

module.exports = Rol;