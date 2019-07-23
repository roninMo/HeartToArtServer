module.exports = function(sequelize, DataTypes) {
    const Song = sequelize.define('song', {
        // artistId: {
        //     type: DataTypes.UUID,
        //     // allowNull: false
        // },
        // albumId: {
        //     type: DataTypes.UUID,
        //     // allowNull: false
        // },
        songName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lyrics: {
            type: DataTypes.STRING(4321),
            allowNull: false
        },

    });
    return Song;
};