const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");
const redis = require("redis");
var redisScan = require('redisscan');
const redisClient = redis.createClient(6379);

redisClient.on('connect', function () {
    console.log('connected');
});

redisClient.on("error", (err) => {
    console.log(err)
});


router.get("/", (req, res) => {

    let most_sold_products = [], top_10_sellers = [], top_5_customers = [], top_10_products = [], orders_per_day = [], top_10_viewed = []
   
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

                                            let arr = []

                                            const promise = new Promise((resolve, reject) => {
                                                redisClient.keys('*', function (err, keys) {
                                                    if (err) return console.log(err);

                                                    for (var i = 0, len = keys.length; i < len; i++) {
                                                        let redisKey = keys[i]
                                                        redisClient.get(redisKey, async function (err, reply) {
                                                            console.log("Key", redisKey)
                                                            console.log("Count", reply)
                                                            await arr.push({ "ProductID": redisKey, "Count": reply })
                                                        });
                                                        console.log("arr1", arr)
                                                    }
                                                    console.log("arr", arr)
                                                });
                                                setTimeout(function () {
                                                    resolve("Success!")  // Yay! Everything went well!
                                                }, 3000)
                                            })
                                            promise.then(result => {
                                                console.log("In promise")
                                                let bubbleSort = (arr) => {
                                                    let len = arr.length;
                                                    for (let i = 0; i < len; i++) {
                                                        for (let j = 0; j < len - 1; j++) {
                                                            console.log("j ", arr[j], " j+1 ", arr[j + 1])
                                                            if (parseInt(arr[j].Count) < parseInt(arr[j + 1].Count)) {
                                                                let tmp = arr[j];
                                                                arr[j] = arr[j + 1];
                                                                arr[j + 1] = tmp;
                                                            }
                                                        }
                                                    }
                                                    console.log("arr sorted", arr)
                                                    return arr;
                                                };
                                                bubbleSort(arr)
                                                top_10_viewed = arr.slice(0, 10)
                                                res.status(200)
                                                res.send(JSON.stringify({ orders_per_day: orders_per_day, most_sold_products: most_sold_products, top_10_sellers: top_10_sellers, top_5_customers: top_5_customers, top_10_products: top_10_products, top_10_viewed : top_10_viewed }))
                                            })
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

router.post("/productCount", function (req, res) {
    // let Count
    // console.log("Ayushhhhhhhh ",req.body)
    let redisKey = req.body.productId
    redisClient.exists(redisKey, (err, result) => {
        if (result === 1) {
            // redisClient.del(redisKey, function(err, reply) {
            //     console.log(reply);
            // });
            redisClient.get(redisKey, function (err, reply) {
                console.log("@@@@@@@@@@\nKey Present")
                console.log("Count", reply)
                redisClient.set([redisKey, ++reply]);
                redisClient.expire(redisKey, 24 * 3600);
                res.send({ "Key": redisKey, "Count": reply })
            })
        }
        else {
            console.log("Inside Adding New Key");
            // console.log("Data:", JSON.stringify(results));
            Count = 1
            redisClient.set([redisKey, Count]);
            redisClient.expire(redisKey, 24 * 3600);
            res.send({ "Key": redisKey, "Count": Count })
            return;
        }
    })
});

module.exports = router;
