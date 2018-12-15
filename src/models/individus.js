module.exports = (sequelize, DataTypes) => {
    var Individus = sequelize.define('Individus', {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      espece: DataTypes.STRING,
      datedenaissance: DataTypes.FLOAT,
      age: DataTypes.FLOAT,
      enclo: DataTypes.STRING
    });
  
    return Individus;
  };
