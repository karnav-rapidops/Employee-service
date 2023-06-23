// Role use-case
const { role } = require('../../use-cases');
const { employeeRoleAssociation } = require('../../use-cases')

// Controller maker functions
const makeAddRoleAction = require('./add-role');
const makeAssignRoleAction = require('./assign-role');
const makeDeleteRoleAction = require('./delete-role');

// Call to maker functions
const addRoleAction = makeAddRoleAction({
    addRole: role.addRole,
})
const assignRoleAction = makeAssignRoleAction({
    assignRole: employeeRoleAssociation.assignRole
})
const deleteRoleAction = makeDeleteRoleAction({
    deleteRole: role.deleteRole
})


// Exporting controllers
module.exports = Object.freeze({
    addRoleAction,
    assignRoleAction,
    deleteRoleAction,
})