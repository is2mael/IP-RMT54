'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "username is required"
        },
        notNull: {
          msg: "username is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: "email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "email is required"
        },
        notNull: {
          msg: "email is required"
        },
        isEmail: {
          msg: "please use format email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required"
        },
        notNull: {
          msg: "password is required"
        }
      }
    },
    imgUrl:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "image is required"
        },
        notNull: {
          msg: "image is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};