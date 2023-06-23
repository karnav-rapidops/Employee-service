const dbMethods = require('../../data-access')
const exceptions = require('../../exceptions')

const makeAssignRole = require('./assign-role');
const makeGetRoleId = require('./get-role-id'); 

const assignRole = makeAssignRole({
    assignRoleDb: dbMethods.cockroach.employeeRoleAssociationDbMethods.assignRole,
});
const getRoleId = makeGetRoleId({
    getRoleIdDb: dbMethods.cockroach.employeeRoleAssociationDbMethods.getRoleId,
    objectNotFoundError: exceptions.objectNotFound,
})

module.exports = Object.freeze({
    assignRole,
    getRoleId,
})