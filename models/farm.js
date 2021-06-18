const mongoose = require('mongoose');
//Fetching product model
const Product = require('./product.js');

const {
    Schema
} = mongoose;

//Creating a farm Schema 

const farmSchema = Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email Required']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

//passing Model middleware
//Here we say specify the query for which middleware is activated for this model
farmSchema.post('findOneAndDelete', async function(farm){
    //Check if there are any products in deleted farm
    if(farm.products.length) {
        //delete all products whose id is in farm.prodcuts
        const res = await Product.deleteMany({_id: {$in: farm.products}});
        console.log(res);
    }
});

//Creating Model from FarmSchema
const Farm = mongoose.model('Farm', farmSchema);

//Exporting the Farm class or Collection
module.exports = Farm;