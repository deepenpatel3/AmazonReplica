const express = require("express");
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");

router.post("/fetchprofile",(req,res)=>{
    console.log("inside fetch profile",req.body);
    kafka.make_request("profile",{ "path": "fetch_profile", "body": data },req.body,(err,results)=>{
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

router.post("/updatenamepic", function(req, res) {
    console.log("Inside Update Profile Post Request ");
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
    kafka.make_request("profile",{ "path": "address_func", "body": data }, req.body, function(err, results) {
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

  module.exports=router;