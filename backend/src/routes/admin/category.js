const express = require("express");
const router = express.Router();
const kafka = require("../../../kafka/client");
const { auth } = require("../../utils/passport");
const { checkAdminAuth, checkAllAuth } = require("../../Utils/passport");
auth();

router.post("/addCategory", checkAdminAuth, (req, res) => {

    kafka.make_request('product', { "path": "add_category", "body": req.body }, function (err, result) {
        console.log("got back from add_category kafka");
        if (!result) {
            console.log("err ", err);
            res.status(400)
            res.end();
        } else {
            console.log("result ", result);
            res.status(200);
            res.end(result.toString());
        }
    });

})

router.post("/removeCategory", checkAdminAuth, (req, res) => {

    kafka.make_request('product', { "path": "remove_category", "body": req.body }, function (err, result) {
        console.log("got back from add_category kafka");
        if (!result) {
            console.log("err ", err);
            res.status(400)
            res.end();
        } else {
            console.log("result ", result);
            res.status(200);
            res.json(result);
            res.end();
        }
    });

})

router.get("/getProducts", checkAllAuth, (req, res) => {

    kafka.make_request('product', { "path": "get_category_products", "body": req.query }, function (err, result) {
        console.log("got back from get_category_products kafka");
        if (!result) {
            console.log("err ", err);
            res.end();
        } else {
            // console.log("result ", result);
            res.status(200);
            res.json(result);
            res.end();
        }
    });
})

router.get("/getCategory", checkAllAuth, (req, res) => {

    kafka.make_request('product', { "path": "get_category", "body": req.query }, function (err, result) {
        console.log("got back from get_category kafka");
        if (!result) {
            console.log("err ", err);
            res.end();
        } else {
            // console.log("result ", result);
            res.status(200);
            res.json(result);
            res.end();
        }
    });
})

module.exports = router;