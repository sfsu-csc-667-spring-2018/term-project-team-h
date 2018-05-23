'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('games', {
      game_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      room_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING
      },
      current_turn: {
        type: Sequelize.INTEGER
      },
      last_hand: {
        type: Sequelize.INTEGER

      },
      game_pot: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      cards_played: {
        type: Sequelize.STRING,
          defaultValue: ""
      },
        seats_taken: {
        type: Sequelize.STRING,
            defaultValue: "0"
        },
        game_state: {
        type: Sequelize.INTEGER,
            defaultValue: 0
        },
        community: {
        type: Sequelize.STRING,
            allowNull: true
        }
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('games');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
