const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");

router.get("/products", function (req, res) {
    const data = {
        page: req.query.page,
        limit: req.query.limit,
    }
    console.log("Data: ",JSON.stringify(data));
    kafka.make_request('product', { "path": "get_all_product", "body": data }, function (err, result) {
        if (!result) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: "Products not found",
            })
            res.end();
        } else {
            console.log("Inside data");
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(result)
            res.end();
            return;
        }
    });
});
module.exports = router;