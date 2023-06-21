const employee = require('../../use-cases/employee');
const Joi = require('joi');
const file = require('../../use-cases/file')

const makeInsertEmployeeAction = require('./insert-employee');
const makeUpdateEmployeeNameAction = require('./update-employee-name');
const makeGetEmployeeByIdAction = require('./get-employee-by-id');
const makeUpdateEmployeeDesignationAction = require('./update-employee-designation'); 
const makeGetEmployeeByCompanyNameAction = require('./get-employee-by-company-name');
const makeDeleteEmployeeByIdAction = require('./delete-Employee-By-Id');
const makeDeleteEmployeeByCompanyIdAction = require('./delete-employee-by-company-id');
const makeVerifyEmployeeAction = require('./verify-employee');
const makeLoginEmployeeAction = require('./login-employee');
const makeGetAllSessionsAction = require('./get-all-sessions');
const makeSearchSessionsAction = require('./search-sessions');
const makeDeleteSessionsAction = require('./delete-sessions');

const insertEmployeeAction = makeInsertEmployeeAction({
    insertEmployee: employee.insertEmployee,
    Joi,
});
const updateEmployeeNameAction = makeUpdateEmployeeNameAction({
    updateEmployeeName: employee.updateEmployeeName,
    Joi,
})
const getEmployeeByIdAction = makeGetEmployeeByIdAction({
    getEmployeeById: employee.getEmployeeById,
    Joi,
})
const getUpdateEmployeeDesignationAction = makeUpdateEmployeeDesignationAction({
    updateEmployeeDesignation: employee.updateEmployeeDesignation,
    Joi,
})
const getEmployeeByCompanyNameAction = makeGetEmployeeByCompanyNameAction({
    getEmployeeByCompanyName: employee.getEmployeeByCompanyName,
    Joi,
})
const deleteEmployeeByIdAction = makeDeleteEmployeeByIdAction({
    deleteEmpployeeById: employee.deleteEmployeeById,
    Joi,
})
const deleteEmployeeByCompanyIdAction = makeDeleteEmployeeByCompanyIdAction({
    deleteEmployeeByCompanyId: employee.deleteEmployeeByCompanyId,
    Joi,
})
const verifyEmployeeAction = makeVerifyEmployeeAction({
    verifyEmployee: employee.verifyEmployee,
})
const loginEmployeeAction = makeLoginEmployeeAction({
    loginEmployee: employee.loginEmployee,
    getEmployeeLocation: employee.getEmployeeLocation, 
    Joi,   
})
const getAllSessionsAction = makeGetAllSessionsAction({
    getAllSessions: employee.getAllSessions,
    Joi,
})
const searchSessionsAction = makeSearchSessionsAction({
    searchSessions: employee.searchSessions,
    Joi,
})
const deleteSessionsAction = makeDeleteSessionsAction({
    deleteSessions: employee.deleteSessions,
    Joi,
})


module.exports = Object.freeze({
    insertEmployeeAction,
    updateEmployeeNameAction,
    getEmployeeByIdAction,
    getUpdateEmployeeDesignationAction,
    getEmployeeByCompanyNameAction,
    deleteEmployeeByIdAction,
    deleteEmployeeByCompanyIdAction,
    verifyEmployeeAction,
    loginEmployeeAction,
    getAllSessionsAction,
    searchSessionsAction,
    deleteSessionsAction,
})