module.exports = function(sequelize, DataTypes) {
    const TestMod = sequelize.define('lyrics', {
        stringArray: {
            type: DataTypes.ARRAY(DataTypes.STRING(4321))
        }
    });
    return TestMod;
};