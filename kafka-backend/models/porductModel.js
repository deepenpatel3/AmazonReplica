const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

var sellerSchema = new Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
});

var productSchema = new Schema({
    Seller: sellerSchema,
    Name: {type: String, required: true},
    Images: [{type: String}],
    Rating: {type: Number, required: true},

});



productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model('product', productSchema);
module.exports = productModel;