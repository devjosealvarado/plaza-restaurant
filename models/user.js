const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    ci: String,
    address: String,
    email: String,
    verified: {
        type: Boolean,
        default: false
    },
    passwordHash: String,
    rol: String,
 
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;