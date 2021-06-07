//Initializing Express and path module/package
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

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
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

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

//New Route
app.get('/products/new', (req, res) => {
    res.render('products/new.ejs');
});

//Create Route (POST)

app.post('/products', async (req, res) => {
    //Creating new instance from Product class
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
});

//Show Route
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    //Find the particular product by Id
    const product = await Product.findById(id);
    res.render('products/details.ejs', {product: product});
});

//Edit Route
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    //Fetch the product details with the help of ID
    const product = await Product.findById(id);    
    res.render('products/edit.ejs', {product: product});
});

//Update Route
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    //Update using mongoose 
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    //We won't have access to product._id if we didn't fetch successfully
    res.redirect(`/products/${product._id}`);
}); 

//Creating or starting our server
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!");
})