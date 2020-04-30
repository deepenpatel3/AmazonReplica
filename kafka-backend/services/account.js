const Customer = require('../models/customerModel');
const Seller = require("../models/sellerModel");
const Admin = require("../models/adminModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


exports.serve = function serve(msg, callback) {
    // console.log('inside kafka backend login service');
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "customer_login":
            customer_login(msg, callback);
            break;
        case "customer_signup":
            customer_signup(msg, callback);
            break;
        case "seller_login":
            seller_login(msg, callback);
            break;
        case "seller_signup":
            seller_signup(msg, callback);
            break;
        case "admin_login":
            admin_login(msg, callback);
            break;
        case "admin_signup":
            admin_signup(msg, callback);
            break;
        case "customer_payment":
            customer_payment(msg,callback);
        case "get_cart":
            get_cart(msg,callback);
            break;
    }
}

function get_cart(msg,callback){

    Customer.findOne({"_id" : msg.body.id}).populate("Cart.ProductID").populate("SaveForLater.ProductID").exec()
    .then(result=>{
        console.log("result",result)
        callback(null,{value : result})
    })
    .catch( err => {
        console.log("ERROR : " + err)
    })
    
    
    // , (err,result) => {
    //     console.log("@@@@@@@@@" + result)
    //     callback(null,{value : result})
    // })
}

function customer_login(msg, callback) {
    let password = msg.body.password;
    Customer.findOne({ Email: msg.body.email })
        .then(customer => {
            if (customer) {
                console.log("customer found-", customer)
                if (bcrypt.compareSync(password, customer.Password)) {
                    console.log('customer match')
                    callback(null, { signInSuccess: true, CID: customer._id, name: customer.Name, message: "successful login" })
                }
                else {
                    console.log('wrong password')
                    callback(null, { signInSuccess: false, message: "Wrong password" })
                }
            }
            else {
                console.log('wrong email')
                callback(null, { signInSuccess: false, message: "Wrong email" })
            }
        })
        .catch(error => {
            console.log('customer login error', error)
            callback(null, { signInSuccess: false, message: "Please try again" })
        })
}

function customer_signup(msg, callback) {

    Customer.findOne({ Email: msg.body.email }, (err, customer) => {
        if (err) {
            console.log('customer signup error', err)
            callback(null, { signInSuccess: false, message: "Please try again" })
        }
        if (customer) {
            console.log("customer already exists")
            callback(null, { signInSuccess: false, message: "Customer already exists" })
        } else {
            console.log("about to signup")
            let hash = bcrypt.hashSync(msg.body.password, salt);
            let newCustomer = new Customer({
                Name: msg.body.name, Email: msg.body.email, Password: hash
            })
            newCustomer.save(() => { callback(null, { signInSuccess: true, CID: newCustomer._id, name: newCustomer.Name, message: "Successfully Signed up" }) });
        }
    })
}

function seller_login(msg, callback) {
    let password = msg.body.password;
    Seller.findOne({ Email: msg.body.email })
        .then(seller => {
            if (seller) {
                console.log("seller found-", seller)
                if (bcrypt.compareSync(password, seller.Password)) {
                    console.log('seller match')
                    callback(null, { signInSuccess: true, SID: seller._id, name: seller.Name, message: "successful login" })
                }
                else {
                    console.log('wrong password')
                    callback(null, { signInSuccess: false, message: "Wrong password" })
                }
            }
            else {
                console.log('wrong email')
                callback(null, { signInSuccess: false, message: "Wrong email" })
            }
        })
        .catch(error => {
            console.log('seller login error', error)
            callback(null, { signInSuccess: false, message: "Please try again" })
        })
}

function seller_signup(msg, callback) {
    Seller.findOne({ Email: msg.body.email }, (err, seller) => {
        if (err) {
            console.log('seller signup error', err)
            callback(null, { signInSuccess: false, message: "Please try again" })
        }
        if (seller) {
            console.log("seller already exists")
            callback(null, { signInSuccess: false, message: "Seller already exists" })
        } else {
            console.log("about to signup")
            let hash = bcrypt.hashSync(msg.body.password, salt);
            let newSeller = new Seller({
                Name: msg.body.name, Email: msg.body.email, Password: hash
            })
            newSeller.save(() => { callback(null, { signInSuccess: true, SID: newSeller._id, name: newSeller.Name, message: "Successfully Signed up" }) });
        }
    })
}

function admin_login(msg, callback) {
    let password = msg.body.password;
    Admin.findOne({ Email: msg.body.email })
        .then(admin => {
            if (admin) {
                console.log("admin found-", admin)
                if (bcrypt.compareSync(password, admin.Password)) {
                    console.log('admin match')
                    callback(null, { signInSuccess: true, AID: admin._id, name: admin.Name, message: "successful login" })
                }
                else {
                    console.log('wrong password')
                    callback(null, { signInSuccess: false, message: "Wrong password" })
                }
            }
            else {
                console.log('wrong email')
                callback(null, { signInSuccess: false, message: "Wrong email" })
            }
        })
        .catch(error => {
            console.log('admin login error', error)
            callback(null, { signInSuccess: false, message: "Please try again" })
        })
}

function admin_signup(msg, callback) {
    Admin.findOne({ Email: msg.body.email }, (err, admin) => {
        if (err) {
            console.log('admin signup error', err)
            callback(null, { signInSuccess: false, message: "Please try again" })
        }
        if (admin) {
            console.log("admin already exists")
            callback(null, { signInSuccess: false, message: "Admin already exists" })
        } else {
            console.log("about to signup")
            let hash = bcrypt.hashSync(msg.body.password, salt);
            let newAdmin = new Admin({
                Name: msg.body.name, Email: msg.body.email, Password: hash
            })
            newAdmin.save(() => { callback(null, { signInSuccess: true, AID: newAdmin._id, name: newAdmin.Name, message: "Successfully Signed up" }) });
        }
    })
}


function customer_payment(msg, callback) {
    Customer.findOne({ _id: msg.body.id }).populate('Cart.ProductID')
    .exec( (err, customer) => {
        if (err) {
            console.log('Customer Payment error', err)
            callback(null, { message: "Please try again" })
        }
        if (customer) {
            console.log("customer payment details")
            callback(null, { Payments : customer.Payments , Address : customer.Address, Cart : customer.Cart })
        }
    })
}