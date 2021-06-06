//We still fetch all the packages 
const mongoose = require('mongoose');

//Creating Model named Product

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true,
        //We make sure the min is 0 as price cannot be negative
        min: 0
    },
    category: {
        type: String,
        lowercase: true, //So that if we enter caps it automatically takes lower(error prevention)
        enum: ["fruit", "vegetable", "dairy"]
    }
})

//Create Class or collection from Schema

const Product = mongoose.model('Product', productSchema);

//Exporting the Product class as an object
module.exports = Product;