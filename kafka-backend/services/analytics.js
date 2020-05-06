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
        case "orders_per_day":
            orders_per_day(msg, callback)
            break
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


async function orders_per_day(msg, callback) {
    let Counts = []
    const promise = new Promise((resolve,reject) =>{

        for (let i = 0; i < 7; i++) {
        let date = new Date(+new Date() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
        date = date.slice(0, 11)
        console.log("Date", date)
        let query = " SELECT COUNT(Order_id) as orders  FROM `Order` where OrderDate = '" + date + "' ";
        mysql.executeQuery(query, async function (err, result) {
            if (err) {
                console.log("error ", err);
                callback(err, null);
            } else {
                console.log("Orders per day Result", result[0].orders)
                // callback(null, result);
                await Counts.push({ "Date": date, "Count": result[0].orders })
                console.log("Counts", Counts)
            }
        })
    }
    
    setTimeout( function() {
        resolve("Success!")  // Yay! Everything went well!
      }, 3000)
})
    promise.then( result=>{
        console.log("In promise")
        callback(null, Counts)
    })

}