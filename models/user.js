
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {    
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            passwordhash: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        });
    }