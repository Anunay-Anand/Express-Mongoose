//We still fetch all the packages 
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

//Creating Model named Product

const productSchema = new Schema({
    name: {
        type: String,
        require: [true, 'price cannot be blank']
    },
    price: {
        type: String,
        require: [true, 'price cannot be black'],
        //We make sure the min is 0 as price cannot be negative
        min: 0
    },
    category: {
        type: String,
        lowercase: true, //So that if we enter caps it automatically takes lower(error prevention)
        enum: ["fruit", "vegetable", "dairy"]
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

//Create Class or collection from Schema

const Product = mongoose.model('Product', productSchema);

//Exporting the Product class as an object
module.exports = Product;