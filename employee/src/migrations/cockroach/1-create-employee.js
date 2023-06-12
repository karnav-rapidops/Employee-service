const Sequelize = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("employee", {
      empid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()")
      },
      cid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      empname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      designation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isverified: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'false',
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    }); 
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};