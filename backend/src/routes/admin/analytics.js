const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");


router.get("/", (req, res) => {
    let most_sold_products = [], top_10_sellers = [], top_5_customers = [], top_10_products = [], orders_per_day = [];

    kafka.make_request('analytics', { "path": "most_sold_products", "body": req.query }, function (err, result) {
        console.log("got back from most sold products kafka");
        if (!result) {
            console.log("err ", err);
            res.end();
        } else {
            res.status(200);
            most_sold_products = result;
            console.log("most_sold_products ", most_sold_products);

            kafka.make_request('analytics', { "path": "top_5_sellers", "body": req.query }, function (err, result) {
                console.log("got back from top 5 sellers kafka");
                if (!result) {
                    console.log("err ", err);
                    res.end();
                } else {
                    res.status(200);
                    top_10_sellers = result;
                    console.log("top_10_sellers ", top_10_sellers);

                    kafka.make_request('analytics', { "path": "top_5_customers", "body": req.query }, function (err, result) {
                        console.log("got back from top 5 customers kafka");
                        if (!result) {
                            console.log("err ", err);
                            res.end();
                        } else {
                            res.status(200);
                            top_5_customers = result;
                            console.log("top_5_customers ", top_5_customers);

                            kafka.make_request('analytics', { "path": "top_10_products", "body": req.query }, function (err, result) {
                                console.log("got back from top 10 products kafka");
                                if (!result) {
                                    console.log("err ", err);
                                    res.end();
                                } else {
                                    res.status(200);
                                    top_10_products = result;
                                    console.log("top_10_products ", top_10_products);

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
                    });
                }
            });
        }
    })
})

module.exports = router;
