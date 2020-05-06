const Product = require('../models/productModel');

exports.serve = function serve(msg, callback) {
    // console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "add_product":
            add_product(msg.body, callback);
            break;
        case "get_all_product":
            get_all_product(msg.body, callback)
            break;
        case "add_seller_product":
            add_seller_product(msg, callback)
            break;
        case "update_seller_product":
            update_seller_product(msg.body.req, callback)
            break;
        case "delete_seller_product":
            delete_seller_product(msg.body.req, callback)
            break;
        case "update_rating":
            update_rating(msg.body, callback)
            break;
    }
}


function update_rating(msg, callback) {

    Product.findById({ _id: msg.id }, (err, product) => {
        if (err) {
            console.log("rating update error", err);
            callback(err, null);
        } else {
            product.Count = product.Count + 1 
            console.log('Count', product.Count)
            product.Rating = (msg.Rating + (product.Rating*(product.Count -1))) / (product.Count);
            console.log(" Rating " , product.Rating)
            product.save(() => { callback(null, { rating: product.Rating }) })
        }
    })
}

function add_seller_product(msg, callback) {
    const product = new Product({
        Name: msg.body.Name,
        Images: msg.file.Images,
        Rating: 0,
        Offers: msg.body.Offers,
        Price: msg.body.Price,
        Description: msg.body.Description,
        Categories: msg.body.Categories,
        Count: 0,
        Reviews: [],
        Seller: {
            SellerId: msg.body.SellerId,
            Name: msg.body.sellerName
        }
    });
    product
        .save()
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err, null);
        })

}

function update_seller_product(msg, callback) {
    Product.updateOne({ _id: msg.id },
        {
            $set: {
                Name: msg.Name,
                // Rating: msg.Rating,
                Offers: msg.Offers,
                Price: msg.Price,
                Description: msg.Description,
                Categories: msg.Categories
            }
        }, { new: true }).exec()
        .then(result => {
            console.log("result", result)
            callback(null, { value: true })
        })
        .catch(err => {
            console.log("ERROR : " + err)
        })
}

function delete_seller_product(msg, callback) {
    Product.deleteOne({ _id: msg.id }, { new: true }).exec()
        .then(result => {
            console.log("result", result)
            callback(null, { value: true })
        })
        .catch(err => {
            console.log("ERROR : " + err)
        })
}


function get_all_product(msg, callback) {
    console.log("@@@@@ PRODUCTS CALLED")
    let condition = {}
    if (msg.SellerId) {
        console.log("inside if");
        condition = { Name: { $regex: '.*' + msg.name + '.*' }, "Seller.SellerId": msg.SellerId }
        if (msg.Categories) {
            if (msg.Categories.length !== 0) condition.Categories = { $all: msg.Categories }
        }
        console.log("condition: ", condition)
        const options = {
            page: msg.page,
            limit: msg.limit,
            // Sorting will be implemented here...
            // sort: msg.sort 
        };
        Product.paginate(condition, options, function (err, result) {

            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    }
    else {
        console.log("inside ELSE");
        console.log("msg", msg)
        condition = { $or: [{ Name: { $regex: '.*' + msg.name + '.*' } }, { "Seller.Name": { $regex: '.*' + msg.name + '.*' } }] }
        if (msg.Categories) {
            if (msg.Categories.length !== 0) {
                condition = {
                    $or: [{ "Seller.Name": { $regex: '.*' + msg.name + '.*' } }, { Name: { $regex: '.*' + msg.name + '.*' } }], Categories: { $all: msg.Categories }
                }
            }
        }
        const options = {
            page: msg.page,
            limit: msg.limit,
            populate : 'Seller.SellerId'
            // Sorting will be implemented here...
            // sort: msg.sort
        };
        console.log("condition: ", condition);
        Product.paginate(condition, options, function (err, result) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        });
    }

}
