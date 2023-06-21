const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up({ context: queryInterface }) {
        await queryInterface.createTable("employee_role_association", {
            roleid: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "role",
                    key: "roleid",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            empid: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "employee",
                    key: "empid",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },


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