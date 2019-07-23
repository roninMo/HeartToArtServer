var express = require('express');
var router = express.Router();

// Include the database
var db = require('../db');

// Bring in the password encryption and webtoken for validating the session
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



/***********************************
 ** Create user endpoint: starter ** 
 **********************************/

 router.post('/signup', (req, res) => {
     var username = req.body.username;
     var email = req.body.email;
     var password = req.body.password;

     db.User.create({
         username: username,
         email: email,
         passwordhash: bcrypt.hashSync(password, 10)
     })
     .then( function success(user){         /* If the request goes through successfully: */

        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24}); 
        //  var token = jwt.sign( // This creates a session token
        //      {id: user.id},  // Attaches the token to the user id
        //      process.env.JWT_SECRET, // This encrypts the token based on our given password
        //      {expiresIn: 60*60*24} // Lifecycle of token { time until it expires! }
        //     );
        
        res.status(200).json({ // What the repsone will return  {an object holding this data: }
            name: user, // The user we created
            token: token, // The token attached to the specific user created 
            message: "User successfully created"
        })

    }, 
    function error(err){            /* If the request goes through unsuccessfully: */
        res.send(500, err.message);
    });

 });


/***********************************
 ** Create sign in endpoint: whew ** 
 **********************************/
router.post('/login', (req, res) => {
    db.User.findOne( {where: {username: req.body.username} })

    .then( // If you find a matching username
        function(user){
            if(user) { // Compare the user password with inputted password
                bcrypt.compare(req.body.password, user.passwordhash, function(err, matches) {
                    if(matches) { // Password matches
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.status(200).json({ // What the repsone will return  {an object holding this data: }
                            name: user, // The user we created
                            token: token, // The token attached to the specific user created 
                            message: "User successfully logged in"
                        })

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
