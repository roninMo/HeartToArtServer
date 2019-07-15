var express = require('express');
var router = express.Router();

// Include the database
var sequelize = require('../db');

// Bring in the models
var User = sequelize.import('../models/user');

// Bring in the password encryption and webtoken for validating the session
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


/***********************************
 ** Create user endpoint: starter ** 
 **********************************/

 router.post('/signup', (req, res) => {
     var username = req.body.user.username;
     var email = req.body.user.email;
     var password = req.body.user.password;

     User.create({
         username: username,
         email: email,
         passwordhash: bcrypt.hashSync(password, 10)
     })
     .then( function success(user){         /* If the request goes through successfully: */

        var token = jwt.sign({ id: user.id }, '12345', {expiresIn: 60*60*24}); 
        //  var token = jwt.sign( // This creates a session token
        //      {id: user.id},  // Attaches the token to the user id
        //      process.env.JWT_SECRET, // This encrypts the token based on our given password
        //      {expiresIn: 60*60*24} // Lifecycle of token { time until it expires! }
        //     );
        
        res.json({ // What the repsone will return  {an object holding this data: }
            user: user, // The user we created
            message: 'created user!', // a message saying it successfully went through
            sessionToken: token // The token attached to the specific user created 
        });

    }, 
    function error(err){            /* If the request goes through unsuccessfully: */
        res.send(500, err.message);
    });

 });


/***********************************
 ** Create sign in endpoint: whew ** 
 **********************************/
router.post('/login', (req, res) => {
    User.findOne( {where: {username: req.body.user.username} })

    .then( // If you find a matching username
        function(user){
            if(user) { // Compare the user password with inputted password
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                    if(matches) { // Password matches
                        var token = jwt.sign({id: user.id}, '12345', {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "Successfully authenticated!",
                            sessionToken: token
                        });

                    } else {  // If it doesn't match
                        res.status(502).send({ error: "Bad Gateway"});
                    }
                });
            } else { // If it doesn't find user/user not true after finding user... 
                res.status(500).send({ error: "Internal Server Error"});
            }
        },
        function(err) { // Fallback error
            res.status(501).send({ error: "Not Implemented"});
        }
    );
});

module.exports = router;
