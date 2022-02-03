const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => sequelize.define("post", {

  title :{
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
},

 {
  sequelize, 
  modelName: 'post' 
 
});