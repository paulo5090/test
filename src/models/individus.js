module.exports = (sequelize, DataTypes) => {
    var Individus = sequelize.define('Individus', {
    	
      nom: DataTypes.STRING,
      espece: DataTypes.STRING,
      numero: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      poids: DataTypes.INTEGER,
      taille: DataTypes.INTEGER
    });
  
    return Individus;
  };
