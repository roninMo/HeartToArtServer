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
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize; // This is server that connects to postgres

// Models/Tables
db.artists = require('./models/artists')(sequelize, Sequelize);
db.albums = require('./models/albums')(sequelize, Sequelize);
db.songs = require('./models/songs')(sequelize, Sequelize);



// Relations
db.songs.belongsTo(db.albums);
db.albums.hasMany(db.songs);
db.albums.belongsTo(db.artists);
db.artists.hasMany(db.albums);
db.songs.hasOne(db.artists);

// Export the db    
module.exports = sequelize; 