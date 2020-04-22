const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var sellerSchema = new Schema({
    name: String,
    email: String,
    password: String,

},
    {
        versionKey: false
    });

module.exports = mongoose.model('seller', sellerSchema);
