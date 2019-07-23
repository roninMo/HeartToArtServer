var jwt = require('jsonwebtoken');
var db = require('../db');

/****************************************
 * Validates the data and passes it onto the function 
****************************************/
module.exports = function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next()
    } else {
        var sessionToken = req.headers.authorization; // pulls and stores token from the authorization header of incoming request
        console.log(sessionToken) // Print the token to the console, just for debugging purposes to ensure our function's working right

        // If no token is present, then 403 forbidden error is returned
        if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provied.'});
        else {
            console.log(sessionToken);
            jwt.verify(sessionToken, process.env.JWT_SECRET , (err, decoded) => { // Decodes the token and sends it through a callback
                if(decoded){
                    db.User.findOne({ where: { id: decoded.id } }).then(user => { // If decoded passes a val back, then findOne will look for an id in the users table that matches the decoded.id 
                        req.user = user;
                        next();
                    },
                function(){
                    res.status(401).send( {error: 'Not authorized'});
                });
                } else {
                    res.status(400).send({ error: 'Not decoded' });
                }
            });
        }
        
    }
}