const { DataTypes, Model } = require('sequelize');


module.exports = (sequelize, Sequelize) => sequelize.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN, // default 
    allowNull: false
  }

}, {
  sequelize, 
  modelName: 'user' 
  
});