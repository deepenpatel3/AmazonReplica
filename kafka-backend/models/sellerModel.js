const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var addressSchema = new Schema({
   c
});

var sellerSchema = new Schema({
    Name: {type: String, required: true},
    Email:  {type: String, required: true},
    Password:  {type: String, required: true},
    ImageName:  {type: String, default: "none", required: false},
    ImageData:{type: String, required: false},
    Address: addressSchema,
    Products: [{type: String}],
    Description:{type: String, required: false},
},
    {
        versionKey: false
    });

module.exports = mongoose.model('seller', sellerSchema);
