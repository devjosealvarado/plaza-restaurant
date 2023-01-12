const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
    mesa: Number,
    orden: String,
    status: String,
    date: String,
    time: String,
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

ordenSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        
    }
});

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;