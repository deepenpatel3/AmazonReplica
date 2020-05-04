const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");
// const Product = require('../../models/productModel');
const redis = require("redis");
const redisClient = redis.createClient(6379);

redisClient.on("error", (err) => {
    console.log(err)
});

router.get("/products", function (req, res) {
    const data = {
        page: req.query.page,
        limit: req.query.limit,
        sellerId: req.query.sellerId,
    }

    // console.log("Data: ",JSON.stringify(data));
    if (parseInt(data.page) < 6 && (!data.sellerId)) {
        let redisKey = "pg_" + data.page
        redisClient.get(redisKey, (err, result) => {
            if (result) {
                // console.log("@@@@@@@@@@\nCALLED FROM CACHE MEMORY")
                res.status(200);
                res.json(JSON.parse(result))
                res.end();
                return;
            }
            else {
                kafka.make_request('product', { "path": "get_all_product", "body": data }, function (err, result) {
                    if (!result) {
                        console.log("Inside err");
                        res.status(404);
                        res.json({
                            status: "error",
                            msg: "Products not found",
                        })
                        res.end();
                        return;
                    } else {
                        // console.log("Inside data");
                        // console.log("Data:", JSON.stringify(results));
                        res.status(200);
                        res.json(result)
                        res.end();
                        redisClient.setex(redisKey, 3600, JSON.stringify(result))
                        return;
                    }
                });
            }
        })

    }
    else {
        kafka.make_request('product', { "path": "get_all_product", "body": data }, function (err, result) {
            if (!result) {
                console.log("Inside err");
                res.status(404);
                res.json({
                    status: "error",
                    msg: "Products not found",
                })
                res.end();
                return;
            } else {
                // console.log("Inside data");
                // console.log("Data:", JSON.stringify(results));
                res.status(200);
                res.json(result)
                res.end();
                return;
            }
        });
    }
});
module.exports = router;