const express = require("express");
var session = require('express-session');
const fs = require('fs');
const router = express.Router();
const { secret } = require("../../utils/config");
const jwt = require('jsonwebtoken');
const kafka = require("../../../kafka/client");

const multer = require('multer');

router.post("/sellerprofile",(req,res)=>{
    console.log("inside seller profile API");
    
});

//Storing documents/Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    }
    , filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
  });
  
const fileFilter=(req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}  

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

router.post("/sellerprofilePic",upload.single('imageData'), (req, res,next) => {
    console.log("inside customer profilepic API",req.body);
    const newImage = new Image({
        imageName: req.body.imageName,
        imageData: req.file.path
    });
    newImage.save()
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            success: true,
            document: result
        });
    })
    .catch((err)=>next(err));
});