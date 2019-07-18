module.exports = function(sequelize, DataTypes) {
    const Artist = sequelize.define('artist', {
        artistName: {
            type: DataTypes.STRING,
            required: true
        }

    });
    return Artist;
};