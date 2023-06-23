const employee = require('./employee');
const email = require('./email');
const kafka = require('./kafka');
const file  = require('./file');
const role = require('./role');
const employeeRoleAssociation = require('./employee-role-association')

module.exports = Object.freeze({
    employeeRoleAssociation,
    employee,
    email,
    kafka,
    file,
    role,
})