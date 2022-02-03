const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => sequelize.define("comment", {
 
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, 
{
  sequelize, 
  modelName: 'comment' 
});