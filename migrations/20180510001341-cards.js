'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cards', {
      cardId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true
      },
      cardNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cardSuit: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cards');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
