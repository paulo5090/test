module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', nameSchema);
  
    return User;
  };
