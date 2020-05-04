const Product = require('../models/productModel');

exports.serve = function serve(msg, callback) {
    console.log("msg", msg);
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
            update_seller_product(msg.body, callback)
            break;
        case "delete_seller_product":
            delete_seller_product(msg.body, callback)
            break;
    }
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
        Reviews : [],
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
    Product.findOneAndUpdate({ _id: msg.id },
        {
            $set: {
                Name: msg.Name,
                Rating: msg.Rating,
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
    if (msg.sellerId) {
        // console.log("In Get Students kafka backend");
        const options = {
            page: msg.page,
            limit: msg.limit,
        };
        // console.log("msg: ",JSON.stringify(msg));
        Product.paginate({ "Seller.SellerId": msg.sellerId }, options, function (err, result) {
            if (err) {
                // console.log("Error: ",err);
                callback(err, null);
            }
            else {
                // console.log("Products found");
                callback(null, result);
            }
        });
    }
    else {
        // console.log("In Get Students kafka backend");
        const options = {
            page: msg.page,
            limit: msg.limit,
        };
        // console.log("msg: ",JSON.stringify(msg));
        Product.paginate({}, options, function (err, result) {
            if (err) {
                // console.log("Error: ",err);
                callback(err, null);
            }
            else {
                // console.log("Products found");
                callback(null, result);
            }
        });
    }

}
