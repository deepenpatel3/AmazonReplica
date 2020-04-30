const Customer = require('../models/customerModel');
const Seller = require('../models/sellerModel');

exports.serve = function serve(msg, callback) {
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "add_customer_profile":
            add_customer_profile(msg.body, callback);
            break;
        case "add_seller_profile":
            add_seller_profile(msg.body, callback);
            break;
        case "get_customer_profile":
            get_customer_profile(msg.body, callback);
            break;
        case "get_seller_profile":
            get_seller_profile(msg.body, callback);
            break;
        case "update_customer_profile":
            update_customer_profile(msg.body, callback);
            break;
        case "update_seller_profile":
            update_seller_profile(msg.body, callback);
            break;
        case "delete_customer_address":
            delete_customer_address(msg.body, callback);
            break;
        case "delete_customer_payment":
            delete_customer_payment(msg.body, callback);
            break;
    }
}

function add_customer_profile(msg, callback){
    const profile_data = new Customer({
        Name: msg.body.Name,
        ImageName: msg.body.ImageName,
        ImageData: msg.body.ImageData,
        Street:msg.body.Street,
        Apt: msg.body.Apt,
        City: msg.body.City,
        State: msg.body.State,
        Zipcode: msg.body.Zipcode,
        Country: msg.body.Country,
        Number: msg.body.Number,
        NameOnCard: msg.body.NameOnCard,
        ExpDate: msg.body.ExpDate
    });
    profile_data
        .save()
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err, null);
        })
}

function add_seller_profile(msg, callback){
    const seller_profile_data = new Customer({
        Name: msg.body.Name,
        ImageName: msg.body.ImageName,
        ImageData: msg.body.ImageData,
        Street:msg.body.Street,
        Apt: msg.body.Apt,
        City: msg.body.City,
        State: msg.body.State,
        Zipcode: msg.body.Zipcode,
        Country: msg.body.Country,
        Number: msg.body.Number,
        NameOnCard: msg.body.NameOnCard,
        ExpDate: msg.body.ExpDate
    });
    seller_profile_data
        .save()
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err, null);
        })
}

function get_customer_profile(msg, callback){
    Customer.find({Email: msg.Email},function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result[0].msg);
        }
    });
}

function get_seller_profile(msg, callback){
    Seller.find({Email: msg.Email},function (err, result) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result[0].msg);
        }
    });
}

function update_customer_profile(msg, callback){
    Customer.findOneAndUpdate({ _id: msg.id },
        {
            $update: {
                Name: msg.Name,
                ImageName: msg.ImageName,
                ImageData: msg.ImageData,
                Street:msg.Street,
                Apt: msg.Apt,
                City: msg.City,
                State: msg.State,
                Zipcode: msg.Zipcode,
                Country: msg.Country            }
        },
        { 
            new: true 
        })
        .exec()
        .then(result => {
            console.log("result", result)
            callback(null, { value: true })
        })
        .catch(err => {
            console.log("ERROR : " + err)
        })
}

function update_seller_profile(msg, callback){
    Seller.findOneAndUpdate({ _id: msg.id },
        {
            $update: {
                Name: msg.Name,
                ImageName: msg.ImageName,
                ImageData: msg.ImageData,
                Street:msg.Street,
                Apt: msg.Apt,
                City: msg.City,
                State: msg.State,
                Zipcode: msg.Zipcode,
                Country: msg.Country
            }
        },
        { 
            new: true 
        })
        .exec()
        .then(result => {
            console.log("result", result)
            callback(null, { value: true })
        })
        .catch(err => {
            console.log("ERROR : " + err)
        })
}

function delete_customer_address(msg, callback) {
    Customer
        .deleteMany(Address)
        .exec()
        .then(result => {
            console.log("result", result)
            callback(null, { value: true })
        })
        .catch(err => {
            console.log("ERROR : " + err)
        })
}

function delete_customer_payment(msg, callback) {
    Customer
        .deleteMany(Payments)
        .exec()
        .then(result => {
            console.log("result", result)
            callback(null, { value: true })
        })
        .catch(err => {
            console.log("ERROR : " + err)
        })
}  