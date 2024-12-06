'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: {
            tableName: 'users'
          }, 
          key: 'id'},
        allowNull: false,
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'questions',
          key: 'id'
        },
        allowNull: false
      },
      upvote: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      file_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      saved: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('answers');
  }
};