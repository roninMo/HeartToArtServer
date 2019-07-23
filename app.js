// Initialize express and create an instance for it 
require('dotenv').config();
var express = require('express');
var app = express();


/***************************
 * Import the controllers *
***************************/
var user = require('./controllers/usercontroller');
var song = require('./controllers/songcontroller');




// We need to pull in the db before we do the routes
var db = require('./db'); // formerly known as db


// Sync all the defined models to the database
db.sequelize.sync() // tip: {force: true} for resetting table data

// We need out middleware for handling requests
app.use(require('./middleware/headers'));

app.use(require('express').json())
// // We need to parse through the body of the application to retrieve data through requests
// var bodyParser = require('body-parser');
// (Initalize before all routes) Essential var(body-parser) that a lot of our subroutes will use
// app.use(bodyParser.json());


/********************
 * Exposed routes *
********************/
app.use('/user', user);



/**********************
 * Protected routes *
**********************/
app.use('/songs', song);





app.listen(process.env.PORT || 3000, function() {
    console.log(`App is listening on port ${process.env.PORT}.`);
});

app.use('/api/test', function(req,res) {
    res.send("This is data from the /api/test endpoint. It's from the server");
});