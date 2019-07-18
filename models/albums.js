module.exports = function(sequelize, DataTypes) {
    const Album = sequelize.define('album', {
        // artistId: {
        //     type: DataTypes.UUID,
        //     // allowNull: false
        // },
        albumName: {
            type: DataTypes.STRING,
            required: true
        },
        albumImage: {
            type: DataTypes.STRING,
            required: false
        },
    });
    return Album;
};