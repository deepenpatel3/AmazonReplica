const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");

router.get("/reviews", function (req, res) {
    const data = {
        ProductID: req.query.product_id,
    }
    // console.log("Data: ",JSON.stringify(data));
    kafka.make_request('review', { "path": "get_reviews_product", "body": data }, function (err, result) {
        if (!result) {
            console.log("Inside err");
            res.status(404);
            res.json({
                status: "error",
                msg: "Reviews not found",
            })
            res.end();
        } else {
            console.log("Inside Review data");
            // console.log("Data:", JSON.stringify(results));
            res.status(200);
            res.json(result)
            res.end();
            return;
        }
    });
});
module.exports = router;