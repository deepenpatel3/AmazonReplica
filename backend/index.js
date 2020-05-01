var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const redis = require("redis");
const { frontendURL } = require("./src/utils/config");

var cors = require("cors");

app.use(cors({ origin: frontendURL, credentials: true }));

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

const redisClient = redis.createClient(6379);

redisClient.on("error" , (err) => {
    console.log(err)
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", frontendURL);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
});

const customerAccount = require("./src/routes/customer/account");
const sellerAccount = require("./src/routes/seller/account");
const adminAccount = require("./src/routes/admin/account");
const customerPayment = require("./src/routes/customer/payment")
const customerProduct = require("./src/routes/customer/product");
const customerReview = require("./src/routes/customer/review");

app.use("/customer", customerAccount);
app.use("/seller", sellerAccount);
app.use("/admin", adminAccount);
app.use("/customer/product", customerProduct);
app.use("/customer/review", customerReview);

//Customer Payment
app.use("/customer/payment",customerPayment)

app.listen(3001);
console.log("Server Listening on port 3001");