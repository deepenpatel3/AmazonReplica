const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");

router.post("/signUp", function (req, res) {
    console.log('inside seller signup api', req.body);

    kafka.make_request('account', { "path": "seller_signup", "body": req.body }, function (err, result) {
        console.log('got back from kafka seller_signup');
        if (err) {
            console.log('error', err)
            res.send({
                signInSuccess: false
            })
        } else {
            console.log("seller signup result- ", result);
            if (result.signInSuccess) {
                var payload = {
                    signInSuccess: result.signInSuccess,
                    SID: result.SID,
                    name: result.name,
                    message: result.message
                }
            }
            else {
                var payload = { signInSuccess: result.signInSuccess, message: result.message }
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})
module.exports = router;