const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var addressSchema = new Schema({
    Street: {type: String, required: true},
    Apt: {type: String, required: false},
    City: {type: String, required: true},
    State: {type: String, required: true},
    Zipcode: {type: String, required: true},
    Country: {type: String, required: true},
});

var paymentSchema = new Schema({
    Number: {type: Number, required: true},
    NameOnCard: {type: String, required: true},
    ExpDate: {type: Date, required: true},
});

var saveForLater = new Schema({
    ProductID: {type: String, required: true , ref: "product"},
    Quantity: {type: Number, required: true},
    Price: {type: Number, required:true},
    IsGift: {type: Boolean, required:true},
    GiftMessage: {type: String, required: false},
});

var cartSchema = new Schema({
    ProductID: {type: String, required: true , ref: "product"},
    Quantity: {type: Number, required: true},
    Price: {type: Number, required:true},
    IsGift: {type: Boolean, required:true},
    GiftMessage: {type: String, required: false},
});

var customerSchema = new Schema({
    Name:  {type: String, required: true},
    Email:  {type: String, required: true},
    Password:  {type: String, required: true},
    ProfileURL:  {type: String, required: false},
    Address: [{type: addressSchema}],
    Payments: [{type: paymentSchema}],
    Cart: cartSchema,
    SaveForLater: saveForLater,
    CommentsRef: [{type: String}],
    
},
    {
        versionKey: false
    });

module.exports = mongoose.model('customer', customerSchema);
