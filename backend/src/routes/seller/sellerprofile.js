const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");
const multer = require('multer');
var path = require('path');
var app = express();
const { auth } = require("../../utils/passport");
const { checkSellrAuth, checkAllAuth } = require("../../Utils/passport");
auth();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("multer file", file);
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});
/*
app.post("/upload_file",upload.any(),(req,res)=>{
    res.send();
});
*/
app.use('../../uploads', express.static(path.join(__dirname, '/uploads')));

router.post("/fetchprofile_seller", checkSellrAuth, (req, res) => {
    console.log("inside fetch profile", req.body);
    kafka.make_request("seller_profile", { "path": "fetchprofile_seller", "body": data }, req.body, (err, results) => {
        console.log("fetching profile", typeof results);
        if (err) {
            console.log("inside error");
            res.json({
                status: "error",
                msg: err
            });
        } else {
            if (typeof results === "string") {
                res.sendStatus(400).end();
            } else {
                res.code = "200";
                res.send({
                    docs: results
                });
                console.log("Profile is populated by data");
                res.end("Profile is populated");
            }
        }
    });
})

router.post("/updatenamepic_seller", upload.array('photos', 5), function (req, res) {
    let UpdatedImages = []
    for (let i = 0; i < req.file.Images.length; i++) {
        UpdatedImages[i] = req.protocol + "://" + req.hostname + ':3001/' + req.file[i].path;
    }

    req.body.Images = UpdatedImages
    console.log("Images Path", req.body.Images)
    const data = {
        req: req,
    }

    console.log("Inside Update name pic Post Request seller ");
    console.log("request body is", req.body);
    kafka.make_request("seller_profile", { "path": "namepic_func_seller", "body": data }, req.body, function (err, results) {
        console.log("Inside name pic update Profile seller");
        console.log(typeof results);

        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: err
            });
        } else {
            console.log("inside else1-namepic");
            if (results.code === "400") {
                // console.log(results.value);
                console.log("inside 400");
                res.sendStatus(400).end();
            } else if (results.code === "200") {
                res.code = "200";
                console.log(" namepic is updated");
                res.sendStatus(200).end("namepic of the profile is updated");
            }
        }
    });
});

router.post("/updateaddress_seller", checkSellrAuth, function (req, res) {
    console.log("Inside Update Profile Post Request ");
    console.log("request body is", req.body);
    kafka.make_request("seller_profile", { "path": "address_func_seller", "body": data }, req.body, function (err, results) {
        console.log("Inside Address Update Profile seller");
        console.log(typeof results);

        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: err
            });
        } else {
            console.log("inside else1");
            if (results.code === "400") {
                // console.log(results.value);
                console.log("inside 400");
                res.sendStatus(400).end();
            } else if (results.code === "200") {
                res.code = "200";
                console.log(" Address is updated");
                res.sendStatus(200).end("Address of the profile is updated");
            }
        }
    });
});

module.exports = router;