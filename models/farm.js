const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
//After the url we always add the database name and 27017 is default port
mongoose.connect('mongodb://localhost:27017/farmStand', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Mongo Connection Open!!");
    })
    .catch(err => {
        console.log("OHH Noo Mongo Connection Error!");
        console.log(err);
    });

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

//Creating Model from FarmSchema
const Farm = mongoose.model('Farm', farmSchema);

//Exporting the Farm class or Collection
module.exports = Farm;