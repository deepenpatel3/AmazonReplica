const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");
const multer = require('multer');
var path = require('path');
var app = express();

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
     storage:storage 
  });
/*
app.post("/upload_file",upload.any(),(req,res)=>{
  res.send();
});
*/
app.use('../../uploads', express.static(path.join(__dirname, '/uploads')));

router.get("/fetchprofile",(req,res)=>{
    console.log("inside fetch profile",req.query.customerId);
 
    kafka.make_request("profile",{ "path": "fetch_profile", "body": { _id: req.query.customerId } },(err,results)=>{
        console.log("fetching profile",typeof results);
        if(err){
            console.log("inside error");
            res.json({ 
                status: "error",
                msg:err
            }); 
        }else{
            if(typeof results === "string"){    
                res.sendStatus(400).end();                
            }else{
                res.code="200";
                res.send({  
                    docs:results
                });
                console.log("Profile is populated by data");
                res.end("Profile is populated");
        }
    }
    });
})

router.post("/updatenamepic", upload.array('photos', 1), function(req, res) {
    console.log("Inside Update Profile Post Request ");
    let UpdatedImages = []
    for (let i = 0; i < req.file.Images.length; i++) {
         UpdatedImages[i] = req.protocol + "://" + req.hostname + ':3001/' + req.file[i].path;
    }
    
    req.body.Image = UpdatedImages[0]
    console.log("Images Path",req.body.Images)
    const data = {
        id: req.body.id,
        ProfileUrl: UpdatedImages[0],
        Name: req.body.Name,
    }

    console.log("request body is", req.body);
    kafka.make_request("profile",{ "path": "namepic_func", "body": data }, req.body, function(err, results) {
      console.log("Inside name pic update Profile ");
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
  
router.post("/updateaddress", function(req, res) {
    console.log("Inside Update Profile Post Request ");
    console.log("request body is", req.body);
    kafka.make_request("profile",{ "path": "address_func", "body": req.body }, function(err, results) {
      console.log("Inside Address Update Profile ");
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

  router.post("/updatecard", function(req, res) {
    console.log("Inside Update Card Profile Post Request");
    console.log("request body is", req.body);
    kafka.make_request("profile",{ "path": "paymentcard_func", "body": data }, req.body, function(err, results) {
      console.log("Inside Payment Update Profile ");
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
          console.log(" Payment is updated");
          res.sendStatus(200).end("Payment of the profile is updated");
        }
      }
    });
  });



  router.post("/addCard", function(req, res) {
    console.log("Inside Added Card Profile Post Request");
    console.log("request body is", req.body);
    kafka.make_request("profile",{ "path": "addCard", "body": req.body }, function(err, results) {
      console.log("Inside Payment Added card ");
      // console.log(typeof results);
  
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
          console.log(" Payment is Added");
          res.sendStatus(200).end("Payment of the profile is Added");
        }
      }
    });
  });

  module.exports=router;