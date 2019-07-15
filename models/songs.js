module.exports = function(sequelize, DataTypes) {
    const Song = sequelize.define('song', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        album_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        songName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lyrics: {
            type: DataTypes.STRING(4321)
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        underscored: true
    });
    return Song;
};