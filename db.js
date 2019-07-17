const Sequelize = require('sequelize');

// Make an instance of sequelize to create a sequelize object se we can establish a connection to the server
const sequelize = new Sequelize('RedBadgeFinal', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres'
});


// We're using the sequelize var to access methods such as authenticate
    // In this case we're using authenticate to return a promise if it successfully connects
    sequelize.authenticate().then(
        function() { // Fire a function if it connects successfully
            console.log('Connected to the red badge final postgres database');
        },
        function(err) { // Fire an error if there are any errors
            console.log(`Error: ${err}`);
        }
    );



    // Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = { };

db.Sequelize = Sequelize;
db.sequelize = sequelize; // This is server that connects to postgres

// Models/Tables
db.User = require('./models/user')(sequelize, Sequelize);

db.Artist = require('./models/artists')(sequelize, Sequelize);
db.Album = require('./models/albums')(sequelize, Sequelize);
db.Song = require('./models/songs')(sequelize, Sequelize);
db.TestMod = require('./models/testMod.js')(sequelize, Sequelize);



// Relations
db.Song.belongsTo(db.Album);
db.Album.hasMany(db.Song);
db.Album.belongsTo(db.Artist);
db.Artist.hasMany(db.Album);

// db.Song.hasOne(db.Artist);
// db.Artist.hasMany(db.Song);

// Export the db    
module.exports = db; 