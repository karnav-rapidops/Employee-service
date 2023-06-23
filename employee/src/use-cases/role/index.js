const dbMethods = require('../../data-access/')

const makeAddRole = require('./add-role');
const makeGetRole = require('./get-role');
const makeDeleteRole = require('./delete-role');

const addRole = makeAddRole({
    addRoleDb: dbMethods.cockroach.roleDbMethods.addRole,
})
const getRole = makeGetRole({
    getRoleDb: dbMethods.cockroach.roleDbMethods.getRole,
}) 
const deleteRole = makeDeleteRole({
    deleteRoleDb: dbMethods.cockroach.roleDbMethods.deleteRole,
})

module.exports = Object.freeze({
    addRole,
    getRole,
    deleteRole,
})
