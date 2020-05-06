const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");


router.get("/", (req, res) => {
    let most_sold_products = [], top_10_sellers = [], orders_per_day = []
    

    kafka.make_request('analytics', { "path": "most_sold_products", "body": req.query }, function (err, result) {
        console.log("got back from most sold products kafka");
        if (!result) {
            console.log("err ", err);
            res.end();
        } else {
            res.status(200);
            most_sold_products = result;
            console.log(most_sold_products);

            kafka.make_request('analytics', { "path": "top_10_sellers", "body": req.query }, function (err, result) {
                console.log("got back from top 10 sellers kafka");
                if (!result) {
                    console.log("err ", err);
                    res.end();
                } else {
                    res.status(200);
                    top_10_sellers = result;
                    console.log(top_10_sellers);

                    kafka.make_request('analytics', { "path": "orders_per_day", "body": req.query }, function (err, result) {
                        console.log("got back from orders_per_day kafka");
                        if (!result) {
                            console.log("err ", err);
                            res.end();
                        } else {
                            res.status(200);
                            orders_per_day = result;
                            console.log(orders_per_day);

                        }
                    });
                }
            });
        }
    })
})

module.exports = router;
