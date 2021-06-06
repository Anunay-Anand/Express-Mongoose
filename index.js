//Initializing Express and path module/package
const express = require('express');
const app = express();
const path = require('path');

//Fetching mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
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
app.get('/dogs', (req, res) => {
    
});

//Creating or starting our server
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!");
})