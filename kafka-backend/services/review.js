const Review = require('../models/reviewModel');

exports.serve = function serve(msg, callback) {
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "add_review":
            add_review(msg.body, callback);
            break;
        case "get_reviews_product":
            get_reviews_product(msg.body, callback)
    }
}

function add_review(msg, callback) {
}


function get_reviews_product(msg, callback){
    // console.log("In Get Students kafka backend");
    // console.log("msg: ",JSON.stringify(msg));
    Review.find({ProductID: msg.ProductID},function (err, result) {
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
