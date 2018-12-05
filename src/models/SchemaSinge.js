module.exports = (sequelize, DataTypes) => {
    var nameSchema = new process.env.MYSQL_ADDON_DB.Schema('nameSchema', {
       firstName: String,
 	   lastNameName: String
    });
  
    return nameSchema;
  };