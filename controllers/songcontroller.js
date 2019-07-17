var express = require('express');
var router = express.Router();

// Include the database
var db = require('../db');
// Include validate session!
var validateSession = require('../middleware/validatesession');


/***********************************
                CREATE SECTION 
 **********************************/
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

        /* We have to create a song that attaches everything together */

    // Create the artist 
    db.Artist.create({
        artistName: artistName,
    })

    .then(artist => { // pass in the artist to create the album 
        console.log('artist init', artist);

            // We connect the album data to the artist made with sequelize db association create(model) 
            // Note this only works if you have the db associations setup like so 
        artist.createAlbum({
            albumName: albumName,
            albumImage: albumImage,
        })
        .then(album => { // pass in the album datat into the song 
            console.log('album init', album);
    
                // Here I did the same thing to pull in the data
            album.createSong({
                songName: songName,
                lyrics: songLyrics,
            })
            .then( song => res.status(200).json(song) )
    // .catch( err => res.status(500).json({ error: err }) )
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    

    })
    .catch(err => console.log(err));


});

/***********************************
    Create Song - and attach the album/artist
 **********************************/
    // Chaining posts together through association functions
    // Clientside function that passes in all the required fetch functions (artist > album > song)



    router.post('/createArtist', validateSession, (req, res) => {
        // Artist data
        artistName = req.body.artistName;
        // Album data
        albumName = req.body.albumName;
        albumImage = req.body.albumImage;
        // Song data 
        songName = req.body.songName;
        songLyrics = req.body.lyrics;
    
    
        db.Artist.create({
            artistName: artistName
        })
        
        .then(artist => res.send(200).json({ artist: artist}))
        .catch(err => console.log(err))
    
    
    })
    
        // Then I wanna find a way to attach one piece of data to another through different routes
    // router.post('/createAlbum', validateSession, (req, res) => {
    //     // Artist data
    //     artistName = req.body.artistName;
    //     // Album data
    //     albumName = req.body.albumName;
    //     albumImage = req.body.albumImage;
    //     // Song data 
    //     songName = req.body.songName;
    //     songLyrics = req.body.lyrics;
    
    //     db.Album.findOne(
    //         { where: {albumName: albumName}},
    //         {
    //             include: [
    //             {
    //                 model: db.Album,
    //                 include: [
    //                     {
    //                         model: db.Song
    //                     }
    //                 ]
    //             }
    //             ]
    //         }
    //     )
    //     .then(found => {
    //         res.send(found);
    //         found.createSong()
    //     })
    //     .catch(err => console.log(err));
    
    // });
    
    
    
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
    /* Find all  */
router.get('/allArtists', validateSession, (req, res) => {
    db.Artist.findAll({
        include: [
            {
                model: db.Album,
                include: [
                    {
                        model: db.Song
                    }
                ]
            }
        ]
    }).then(Artist => res.send(200).json(Artist))
});
    

    /* Find one */


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
