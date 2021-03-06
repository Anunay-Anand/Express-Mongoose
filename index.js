//Initializing Express and path module/package
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

//Fetching all models of developer created modules
const Product = require('./models/product.js');
const Farm = require('./models/farm.js');
const AppError = require('./AppError.js');

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

//making ejs are default view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));

//Setting path of views and public folder
app.set('views', path.join(__dirname, 'views'));

//All categories
const categories = ['fruit', 'vegetable', 'dairy'];

// After learning populate and reference how to link two models and collection 

//Farm Route
//Index Route Farm
app.get('/farms', async(req, res) => {
    const farms = await Farm.find({}); 
    res.render('farms/index.ejs', {farms: farms});
});

//Create Route
app.get('/farms/new', (req, res, next) => {
    res.render('farms/new.ejs');
});

//Create Route (end point)
app.post('/farms', async (req, res, next) => {
    const farm = new Farm({...req.body});
    const newFarm = await farm.save();
    res.redirect('/farms');
});

//Show Route 
app.get('/farms/:id', async (req, res, next) => {
    // const { id } = req.params;
    const farm = await Farm.findById(req.params.id).populate('products');
    // console.log(farm);
    res.render('farms/show', { farm: farm });
});

//Delete Route (Farms)
app.delete('/farms/:id', async(req, res, next) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
}); 

//Product Route
//Create Route 
app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', {categories, id, farm});
});

//Create Route (End Point)
app.post('/farms/:id/products', async (req, res, next) => {
    //Fetch farm from ID so that we can populate it or insert the product Id 
    const { id } = req.params;
    const farm = await Farm.findById(id);
    //Create Product with the req.body
    const product = new Product({...req.body});
    //Pusing the product into farm (it will automatically only show id)
    farm.products.push(product);
    //Also store the farm Id in product
    product.farm = farm;
    //Save both of them for changes to be saved
    await farm.save();
    await product.save();
    res.redirect(`/farms/${farm._id}`);
});

//Creating Routes
//Index Route
app.get('/products', async (req, res) => {
    //Check if category string passed
    const { category } = req.query;
    if (category) {
        const products = await Product.find({category: category});
        res.render('products/index.ejs', {products: products, category: category}); 
    } else {
        //passing a query to find all products
        const products = await Product.find({});
        //Locating to the products folder containing it's ejs files
        //Pass all the products found as second parameter
        res.render('products/index.ejs', {
            products: products, category: 'All'
        });
    }

});

//New Route
app.get('/products/new', (req, res) => {
    // throw new AppError('Not allowed', 401);
    res.render('products/new.ejs', {
        categories: categories
    });
});

//Create Route (POST)
app.post('/products', async (req, res, next) => {
    try{
    //Creating new instance from Product class
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
    }
    catch(e){
        next(e);
    }
});

//Show Route
app.get('/products/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    //Find the particular product by Id
    const product = await Product.findById(id).populate('farm', 'name');
    //Check for async Error using if and next()
    if(!product) {
        next(new AppError('The product was not found', 404));
    }
    res.render('products/details.ejs', {
        product: product
    });
});

//Edit Route
app.get('/products/:id/edit', async (req, res) => {
    const {
        id
    } = req.params;
    //Fetch the product details with the help of ID
    const product = await Product.findById(id);
    res.render('products/edit.ejs', {
        product: product,
        categories: categories
    });
});

//Update Route
app.put('/products/:id', async (req, res) => {
    const {
        id
    } = req.params;
    //Update using mongoose 
    const product = await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    });
    //We won't have access to product._id if we didn't fetch successfully
    res.redirect(`/products/${product._id}`);
});

//Delete Route

app.delete('/products/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

//Custom Error handling middleware
app.use((err, req, res, next) => {
    const { status = 500, message = 'There was some Error' } = err;
    res.status(status).send(message);
});

//Creating or starting our server
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!");
})