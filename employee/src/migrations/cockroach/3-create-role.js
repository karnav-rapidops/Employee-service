const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up({ context: queryInterface }) {
        await queryInterface.createTable("role", {
            roleid: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.literal("gen_random_uuid()"),
                allowNull: false,
                primaryKey: true
            },
            rolename: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            permission: {
                type: Sequelize.DataTypes.JSONB,
                allowNull: false
            },
            compnayid: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            ismaster: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false
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