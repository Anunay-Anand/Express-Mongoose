//Seeds file to temporarily to work with our database and test purposes
//Fetch Model and create to database
//Fetching mongoose
const mongoose = require('mongoose');
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
//Model
const Product = require('./models/product.js');

//Create multiple instances as an Array

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

//Using Mongoose to insert many at a time
Product.insertMany(seedProducts)
.then(data => console.log(data))
.catch(err => console.log(err));