const Sequelize = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("auth", {
      empid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: "employee", key: "empid" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        defaultValue: Sequelize.literal("gen_random_uuid()")
      },
      sessionid: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
      },
      accesstoken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      expiretime: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      ipaddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      useragent: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      country: {
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