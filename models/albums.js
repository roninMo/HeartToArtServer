module.exports = function(sequelize, DataTypes) {
    const Album = sequelize.define('album', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        artistId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        albumName: {
            type: DataTypes.STRING,
            required: true
        },
        albumImage: {
            type: DataTypes.STRING,
            required: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    return Album;
};