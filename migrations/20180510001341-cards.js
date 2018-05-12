'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cards', {
      card_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true
      },
      card_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      card_suit: {
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
