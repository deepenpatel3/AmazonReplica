const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    imageName:{
        type: String,
        default: "none",
        required: true
    },
    imageData:{
        type:String,
        required: true
    }

},
    {
        versionKey: false
    });

module.exports = mongoose.model('customer', customerSchema);
