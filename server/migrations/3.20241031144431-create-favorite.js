'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      photoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Photos",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      imgUrl: {
        type: Sequelize.STRING,
        allowNull:false
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  }
};