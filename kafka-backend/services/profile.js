const Customer = require('../models/customerModel');

exports.serve = function serve(msg, callback) {
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "fetchprofile":
            fetchprofile(msg.body, callback);
            break;
        case "namepic_func":
           namepic_func(msg.body, callback);
            break;
        case "address_func":
            address_func(msg.body, callback);
            break;
        case "paymentcard_func":
            paymentcard_func(msg.body, callback);
            break;       
    }
}

function fetchprofile(msg, callback) {
    var res = {};

    Customer.findOne({"user.email":msg.email},
        function(err,docs) {
            if(err){
                console.log("Inside if : error",err);
                res.code="400";
                res.value="No user found";
                //res.sendStatus(400).end("No user found");
                callback(null,res.value);
            }
            else{
                console.log("Inside else : ");
                res.code="200";
                
                console.log("User is found",docs);
                    //res.end(JSON.stringify(docs));
                callback(null,docs);
            }
        }
    )
}

function namepic_func(msg, callback){
    var res = {};
    Customer.findOneAndUpdate({"user.email":msg.email},{"$set": { "user.name":msg.name,"user.profileimage":msg.profileimage}},
        function(err, user) {
          if (err) {
            res.code = "400";
            res.value =
              "The user is not valid";
            console.log(res.value);
            
            callback(null,res);
            //res.sendStatus(400).end();
          } else {
            res.code = "200";
            console.log("Update successful");
            callback(null,res);
            //res.sendStatus(200).end();
          } 
        }
      );   
}

function address_func(msg, callback){
    var res = {};
    Customer.findOneAndUpdate({"user.email":msg.email},{"$set": {'user.address':msg.address}},
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value =
          "The user is not valid";
        console.log(res.value);
        callback(null,res);
        //res.sendStatus(400).end();
      } else {
        res.code = "200";
        console.log("Update successful address");
        callback(null,res);
        //res.sendStatus(200).end();
      } 
        }
      );
}

function paymentcard_func(msg, callback){
    var res = {};
    Customer.findOneAndUpdate({"user.email":msg.email},{"$set": {'user.card':msg.card}},
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value =
          "The user is not valid";
        console.log(res.value);
        callback(null,res);
        //res.sendStatus(400).end();
      } else {
        res.code = "200";
        console.log("Update successful card");
        callback(null,res);
        //res.sendStatus(200).end();
      } 
        }
      );
}



