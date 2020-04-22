const Customer = require('../models/customerModel');
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
    }
}

function customer_login(msg, callback) {
    let password = msg.body.password;
    Customer.findOne({ email: msg.body.email })
        .then(customer => {
            if (customer) {
                console.log("customer found-", customer)
                if (bcrypt.compareSync(password, customer.password)) {
                    console.log('customer match')
                    callback(null, { signInSuccess: true, CID: customer._id, name: customer.name, message: "successful login" })
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

    Customer.findOne({ email: msg.body.email }, (err, customer) => {
        if (err) {
            console.log('customer signup error', err)
            callback(null, { signUpSuccess: false, message: "Please try again" })
        }
        if (customer) {
            console.log("customer already exists")
            callback(null, { signUpSuccess: false, message: "Customer already exists" })
        } else {
            console.log("about to signup")
            let hash = bcrypt.hashSync(msg.body.password, salt);
            let newCustomer = new Customer({
                name: msg.body.name, email: msg.body.email, password: hash
            })
            newCustomer.save(() => { callback(null, { signUpSuccess: true, CID: newCustomer._id, name: newCustomer.name }) });
        }
    })
}