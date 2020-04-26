const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

var sellerSchema = new Schema({
    SellerId: {type: String, required: true},
    Name: {type: String, required: true},
    SellerProfileUrl: {type: String}

});

var reviewSchema = new Schema({
    CustomerId: {type: String, required: true},
    CustomerName: {type: String, required: true},
    Rating: {type: Number, required: true},
    Review: {type: String, required: true}
});


var productSchema = new Schema({
    Seller: sellerSchema,
    Name: {type: String, required: true},
    Images: [{type: String}],
    Rating: {type: Number, required: true},
    Offers:[{type: String}],
    Price: {type: Number, required: true},
    Description:{type: Number, required: true},
    Reviews: [reviewSchema],
    Categories: [{type: String}],
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model('product', productSchema);
module.exports = productModel;