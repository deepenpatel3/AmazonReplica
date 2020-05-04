const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");
const multer = require('multer');
var path = require('path');
var app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
})
app.use('../../uploads', express.static(path.join(__dirname, '/uploads')));


router.post("/addProduct", upload.array('photos', 5), function (req, res) {
    let UpdatedImages = []
    for (let i = 0; i < req.file.Images.length; i++) {
        UpdatedImages[i] = req.protocol + "://" + req.hostname + ':3001/' + req.file[i].path;
    }

    req.body.Images = UpdatedImages
    console.log("Images Path", req.body.Images)
    const data = {
        Name: req.body.Name,
        Images: req.file.Images,
        Offers: [],
        Price: req.body.Price,
        Description: req.body.Description,
        Categories: req.body.Categories,
        SellerId: req.body.SellerId,
        Name: req.body.sellerName,
    }
    // console.log("Data: ",JSON.stringify(data));
    kafka.make_request('product', { "path": "add_seller_product", "body": data }, function (err, result) {
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

router.get("/updateProduct", function (req, res) {
    const data = {
        req: req.body
    }
    // console.log("Data: ",JSON.stringify(data));
    kafka.make_request('product', { "path": "update_seller_product", "body": data }, function (err, result) {
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

router.get("/deleteProduct", function (req, res) {
    const data = {
        req: req.body
    }
    // console.log("Data: ",JSON.stringify(data));
    kafka.make_request('product', { "path": "delete_seller_product", "body": data }, function (err, result) {
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