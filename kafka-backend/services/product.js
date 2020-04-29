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
    }
}

function add_product(msg, callback) {
}


function get_all_product(msg, callback){
    console.log("In Get Students kafka backend");
    const options = {
        page: msg.page,
        limit: msg.limit,
    };
    console.log("msg: ",JSON.stringify(msg));
    Product.paginate({},options,function (err, result) {
        if (err) {
            console.log("Error: ",err);
            callback(err, null);
        }
        else {
            console.log("Products found");
            callback(null, result);
        }
    });
}
