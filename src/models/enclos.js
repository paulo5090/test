module.exports = (sequelize, DataTypes) => {
    var Enclos = sequelize.define('Enclos', {
        
        nom: DataTypes.STRING,
        capacite: DataTypes.INTEGER
    });

    return Enclos;
};