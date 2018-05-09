'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      userPassword: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userMoney: {
        type: Sequelize.INTEGER,
      }
    });
  },
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
