products = [
    {
        ProductName: "Apple AirPods Pro",
        ProductRating: 3.5,
        ProductPrice: 234,
        ProductImages: ["https://images-na.ssl-images-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/718UsV0ns5L._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71bhWgQK-cL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/81nuOe%2BXCtL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71SJDhJtEVL._AC_SL1500_.jpg"],
        offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
        ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
        Categories: ["Electronics", "Earbuds"],
        Reviews: [],
    },
    {
        ProductName: "New Apple iPad (10.2-Inch, Wi-Fi, 32GB) - Space Gray (Latest Model)",
        ProductRating: 5,
        ProductPrice: 299,
        ProductImages: ["https://m.media-amazon.com/images/I/6162WMQWhVL._AC_UL640_FMwebp_QL65_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/51BokXhnBbL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/5145l0K6fDL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/61MYgDuxqbL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71tvYppCioL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/51KDP8vi4uL._AC_SL1500_.jpg"
        ],
        offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
        ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
        Categories: ["Electronics", "Earbuds"],
        Reviews: [],
    },
    {
        ProductName: "Apple Watch Series 5 (GPS, 44mm) - Space Gray Aluminum Case with Black Sport Band",
        ProductRating: 3.5,
        ProductPrice: 414,
        ProductImages: ["https://m.media-amazon.com/images/I/71wu+HMAKBL._AC_UL640_FMwebp_QL65_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71LX4GnkYFL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71Xt1HvigDL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/81lV6jrGQlL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71-5xAstWTL._AC_SL1500_.jpg",],
        offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
        ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
        Categories: ["Electronics", "Earbuds"],
        Reviews: [],
    },
    {
        ProductName: "New Apple MacBook Air (13-inch, 8GB RAM, 256GB SSD Storage) - Gold",
        ProductRating: 4.5,
        ProductPrice: 949.99,
        ProductImages: ["https://m.media-amazon.com/images/I/71thf1SYnGL._AC_UL640_FMwebp_QL65_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/310q4ue7jjL._AC_SL1024_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/6186nCBW02L._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/51YNm2P9VjL._AC_SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/41aGUF63L2L._AC_SL1024_.jpg"],
        offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
        ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
        Categories: ["Electronics", "Earbuds"],
        Reviews: [],
    },
]

const Product = require('../models/productModel');

exports.serve = function serve(msg, callback) {
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "add_product":
            customer_login(msg, callback);
            break;
    }
}

function add_product(msg, callback) {
    Product
}