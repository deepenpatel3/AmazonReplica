const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");

router.post("/payment", (req, res) => {
    console.log("inside customer payment api", req.body);

    let body = {
        id : req.body.id
    }
    kafka.make_request('account', { "path": "customer_payment", "body": body }, function (err, result) {
        console.log('got back from kafka customer_payment');
        if (err) {
            console.log('error', err)
            res.send(JSON.stringify({
                message: "Please try again"
            }))
        } else {
            console.log("customer payment result- ", result);
            if (result) {
                var payload = {
                    result : result
                }
            }
            // else {
            //     var payload = { result }
            // }
            // var token = jwt.sign(payload, secret, {
            //     expiresIn: 1008000 // in seconds
            // });
            // res.end(JSON.stringify({ token: "JWT " + token }))
            res.send(payload)
        }
    });
})

router.post("/address", function (req, res) {
    console.log('inside customer payment address api', req.body);

    kafka.make_request('account', { "path": "customer_address", "body": req.body }, function (err, result) {
        console.log('got back from kafka payment');
        if (err) {
            console.log('error', err)
            res.send({
                message : "Please try again"
            })
        } else {
            console.log("customer payment result- ", result);
            if (result) {
                var payload = {
                    result : result
                }
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post("/cart", function (req, res) {
    console.log('inside customer payment address api', req.body);

    kafka.make_request('account', { "path": "customer_cart", "body": req.body }, function (err, result) {
        console.log('got back from kafka payment');
        if (err) {
            console.log('error', err)
            res.send({
                message : "Please try again"
            })
        } else {
            console.log("customer payment result- ", result);
            if (result) {
                var payload = {
                    result : result
                }
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})
module.exports = router;