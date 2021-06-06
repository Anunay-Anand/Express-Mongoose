//We still fetch all the packages 
const mongoose = require('mongooose');

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
        enum: ["fruit", "vegetable", "dairy"]
    }
})

//Create Class or collection from Schema

const Product = mongoose.model('Product', productSchema);