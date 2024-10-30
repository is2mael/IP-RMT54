'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photo.hasMany(models.Favorite, {
        foreignKey: "photoId"
      })
    }
  }
  Photo.init({
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    tags: DataTypes.STRING,
    views: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};