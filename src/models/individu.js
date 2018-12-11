module.exports = (sequelize, DataTypes) => {
    var Individu = sequelize.define('Individu', {
      nom: DataTypes.STRING
      image: DataTypes.STRING
      espece: DataTypes.STRING
      datedenaissance: DataTypes.FLOAT
      age: DataTypes.FLOAT
      enclo: DataTypes.STRING
    });
  
    return Individu;
  };
