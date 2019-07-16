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

// We need to parse through the body of the application to retrieve data through requests
var bodyParser = require('body-parser')

// Sync all the defined models to the database
db.sync() // tip: {force: true} for resetting table data
// (Initalize before all routes) Essential var(body-parser) that a lot of our subroutes will use
app.use(bodyParser.json());

// We need out middleware for handling requests
app.use(require('./middleware/headers'));





/********************
 * Exposed routes *
********************/
app.use('/user', user);












app.listen(3000, function() {
    console.log('App is listening on port 3000.');
});

app.use('/api/test', function(req,res) {
    res.send("This is data from the /api/test endpoint. It's from the server");
});
/**********************
 * Protected routes *
**********************/
// Import the authentication
app.use(require('./middleware/validatesession'));

app.use('/songs', song);