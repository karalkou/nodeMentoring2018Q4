'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    reviews: DataTypes.INTEGER,
    name: DataTypes.STRING,
    isFavorite: DataTypes.BOOLEAN,
    color: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};