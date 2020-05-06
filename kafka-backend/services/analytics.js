var mysql = require("../models/mysql");

exports.serve = function serve(msg, callback) {
    // console.log('inside kafka backend login service');
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "most_sold_products":
            most_sold_products(msg.body, callback);
            break;
        case "top_10_sellers":
            top_10_sellers(msg.body, callback);
            break;
    }
}

function most_sold_products(msg, callback) {
    let query = "SELECT ProductID, COUNT(ProductID) as Orders FROM `Order` GROUP BY ProductID ORDER BY Orders DESC LIMIT 5";

    mysql.executeQuery(query, function (err, result) {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            // console.log(result)
            callback(null, result);
        }
    })
}

function top_10_sellers(msg, callback) {
    let query = " SELECT SellerID, SUM(Price) as Sales FROM `Order` GROUP BY SellerID ORDER BY Sales DESC LIMIT 10";
    mysql.executeQuery(query, function (err, result) {
        if (err) {
            console.log("error ", err);
            callback(err, null);
        } else {
            console.log(result)
            callback(null, result);
        }
    })
}