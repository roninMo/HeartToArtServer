var express = require('express');
var router = express.Router();

// Include the database
var db = require('../db');
// Include validate session!
var validateSession = require('../middleware/validatesession');

// Bring in the models
var Artist = db.import('../models/artists');
var Album = db.import('../models/albums');
var Song = db.import('../models/songs');
var TestMod = db.import('../models/testMod.js');

/***********************************
    Create Song - and attach the album/artist
 **********************************/
router.post('/create', validateSession, (req, res) => { // We create artist into album into song all interpolated
                                        // pass the userid through the promise into the next model
    // Initialize given vars to put into each of the models

            // So this needs to be sent up to the server in a song object holding all the values
                        // // NOTE: These are pulled straight from the client, we may need to change that to an object
    // Artist data
    artistName = req.body.artistName;
    // Album data
    albumName = req.body.albumName;
    albumImage = req.body.albumImage;
    // Song data 
    songName = req.body.songName;
    songLyrics = req.body.lyrics;
    // Time created
    const createdAt = new Date();

        /* We have to create a song that attaches everything together */

    // Create the artist 
    db.Artist.create({
        artistName: artistName,
        createdAt: createdAt
    })
    .then(artist => { // pass in the artist to create the album 
        artistPass = json(artist); // turn the artist data into a json to pass in the id 

        db.Album.create({
            aritistId: artistPass.id,
            albumName: albumName,
            albumImage: albumImage,
            createdAt: createdAt
        })

    
    })
    .then(album => { // pass in the album datat into the song 
        albumPass = json(album);

        db.Song.create({
            albumId: albumPass.id,
            songName: songName,
            lyrics: songLyrics,
            createdAt: createdAt
        })

        console.log('artist: ', artist);
        console.log('album: ', album);
    })

    .then( song => res.status(200).json(song) )
    .catch( err => res.status(500).json({ error: err }) )

});

/***********************************
                UPDATE SECTION
 **********************************/
/***********************************
    Update Song 
 **********************************/
router.put('updateSong/:id', validateSession, (req, res) => {
    var songRef = req.params.id; // id from the route

    // Pull in the data from the client
    songName = req.body.song.songName;
    lyrics = req.body.song.lyrics;


    Song.update({
        songName: songName,
        lyrics: lyrics
    },
    {
        where: {id: songRef}
    })
    
    .then(
        function success(updatedSong) {
            res.json({
                song: updatedSong,
                message: 'updated the Song!'
            });
        },
        function updateError(err) {
            res.status(500).json({ error: err })
        }
    )
});

/***********************************
    Update Album 
 **********************************/
router.put('updateAlbum/:id', validateSession, (req, res) => {
    var albumRef = req.params.id; // id from the route

     // Pull in the data from the client
     albumName = req.body.album.albumName;
     albumImage = req.body.album.albumImage;


    Album.update({
        albumName: AlbumName,
        albumImage: albumImage
    },
    {
        where: {id: albumRef}
    })

    .then(
        function success(updatedAlbum) {
            res.json({
                album: updatedAlbum,
                message: 'updated the Album!'
            });
        },
        function updateError(err) {
            res.status(500).json({ error: err })
        }
    )
});

/***********************************
    Update Artist
 **********************************/
router.put('updateArtist/:id', validateSession, (req, res) => {
    var artistRef = req.params.id; // id from the route

     // Pull in the data from the client
     artistName = req.body.artist.artistName;


    Artist.update({
        artistName: artistName
    },
    {
        where: {id: artistRef}
    })

    .then(
        function success(updatedArtist) {
            res.json({
                artist: updatedArtist,
                message: 'updated the Artist!'
            });
        },
        function updateError(err) {
            res.status(500).json({ error: err })
        }
    )
});



/***********************************
                DELETE SECTION
 **********************************/
/***********************************
    Delete Song
 **********************************/
router.delete('deleteSong/:id', validateSession, (req, res) => {
    var routeRef = req.params.id; // id from the route

    Song.destroy({ where: {id: routeRef} })

    .then(
        function deleteSuccess(data) {
            res.status(200).send("Song successfully removed");
        },
        function deleteError(err) {
            res.status(500).json({ error: err });
        }
    )

});

/***********************************
    Delete Album
 **********************************/
router.delete('deleteAlbum/:id', validateSession, (req, res) => {
    var routeRef = req.params.id; // id from the route

    Album.destroy({ where: {id: routeRef} })

    .then(
        function deleteSuccess(data) {
            res.status(200).send("Album successfully removed");
        },
        function deleteError(err) {
            res.status(500).json({ error: err });
        }
    )

});

/***********************************
    Delete Artist
 **********************************/
router.delete('deleteArtist/:id', validateSession, (req, res) => {
    var routeRef = req.params.id; // id from the route

    Artist.destroy({ where: {id: routeRef} })

    .then(
        function deleteSuccess(data) {
            res.status(200).send("Artist successfully removed");
        },
        function deleteError(err) {
            res.status(500).json({ error: err });
        }
    )

});

/***********************************
                GET SECTION 
 **********************************/
/***********************************
    Find song (return all data)
 **********************************/
    // song > artist > album 


/***********************************
    Find album (return all data)
 **********************************/
    // album > song > artist 


/***********************************
    Find artist (return all data)
 **********************************/
    // artist > album > song




/***********************************
    EXPERIMENTAL STUFF, STRING ARR
 **********************************/
    // Test crud functions for a new model that will hold the verses and stuff to display the song in an orderly structure

                                // Putting the array in the db
router.post('/createTest', validateSession, (req, res) => {
    var stringArray = req.body.lyrics.stringArray

    TestMod.create({
        stringArray: stringArray
    })

    .then( newArray => res.status(200).json(newArray) )
    .catch( err => res.status(500).json({ error: err }) );
});

                                // Find all arrays 
router.get('/readTest', validateSession, (req, res) => {
    TestMod.findAll()

    .then( stringArr => res.status(200).json(stringArr) )
    .catch( err => res.status(500).json({ error: err }) );
});

                                // Delete the array from the db 
router.delete('/deleteTest/:id', validateSession, (req, res) => {
    // id from the route
    var data = req.params.id;

    TestMod.destroy({ where: {id: data} })

    .then( moreData => res.status(200).send("successfully deleted!").json(moreData) )
    .catch( err => res.status(500).json({ error: err }) );
});

module.exports = router;
