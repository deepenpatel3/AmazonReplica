const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");

router.post("/signIn", (req, res) => {
    console.log("inside admin signin api", req.body);

    let body = {
        email: req.body.email,
        password: req.body.password
    }
    kafka.make_request('account', { "path": "admin_login", "body": body }, function (err, result) {
        console.log('got back from kafka admin_login');
        if (err) {
            console.log('error', err)
            res.send(JSON.stringify({
                signInSuccess: false,
                message: "Please try again"
            }))
        } else {
            console.log("admin login result- ", result);
            if (result.signInSuccess) {
                var payload = {
                    signInSuccess: result.signInSuccess,
                    AID: result.AID,
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

router.post("/signUp", function (req, res) {
    console.log('inside admin signup api', req.body);

    kafka.make_request('account', { "path": "admin_signup", "body": req.body }, function (err, result) {
        console.log('got back from kafka admin_signup');
        if (err) {
            console.log('error', err)
            res.send({
                signInSuccess: false
            })
        } else {
            console.log("admin signup result- ", result);
            if (result.signInSuccess) {
                var payload = {
                    signInSuccess: result.signInSuccess,
                    AID: result.AID,
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