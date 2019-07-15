module.exports = function(sequelize, DataTypes) {
    const Artist = sequelize.define('artist', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDv4,
            allowNull: false
        },
        artistName: {
            type: DataTypes.STRING,
            required: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }, 
    }, { 
        underscored: true 
    });
    return Artist;
};