//Initializing Express and path module/package
const express = require('express');
const app = express();
const path = require('path');

//Fetching all models of developer created modules
const Product = require('./models/product');

//Fetching mongoose
const mongoose = require('mongoose');
//After the url we always add the database name and 27017 is default port
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    console.log("Mongo Connection Open!!");
}) 
.catch( err => {
    console.log("OHH Noo Mongo Connection Error!");
    console.log(err);
});

//making ejs are default view engine
app.set('view engine', 'ejs');

//Setting path of views and public folder
app.set('views', path.join(__dirname, 'views'));

//Creating Routes

//Index Route
app.get('/products', async (req, res) => {
    //passing a query to find all products
    const products = await Product.find({});
    //Locating to the products folder containing it's ejs files
    //Pass all the products found as second parameter
    res.render('products/index.ejs', {products: products});
});

//Show Route
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    //Find the particular product by Id
    const product = await Product.findById(id);
    res.render('products/details.ejs', {product: product});
});

//Creating or starting our server
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!");
})