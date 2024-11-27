'use strict';

const user = require('../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      value: {
        type: Sequelize.INTEGER
      },
      user_id: {

        type: Sequelize.INTEGER,
        references: { 
          model: {
            tableName: 'users'
          }, 
          key: 'id' 
        },
        // references: { model: 'users', key: 'id'},
        allowNull: false,
      },
      answer_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: {
            tableName: 'answers'
          }, 
          key: 'id' 
        },
        // references: { model: 'answers', key: 'id' },
        allowNull: false,
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
    await queryInterface.dropTable('ratings');
  }
};