const { getCompanyIdByName } = require('../../internal-service-call/company-service')
const dbMethods = require('../../data-access');
const exceptions = require('../../exceptions');
const { producer } = require('../kafka')

// NPMs 
const jwt = require('jsonwebtoken');
const axios = require('axios');
const uuid = require('uuid');
const Joi = require('joi');
const ipinfo = require('ipinfo')

// Import maker functions of use-cases
const makeInsertEmployee = require('./insert-employee');
const makeUpdateEmployeeName = require('./update-employee-name'); 
const makeGetEmployeeById = require('./get-employee-by-id');
const makeUpdateEmployeeDesignation = require('./update-employee-designation');
const makeGetEmployeeByCompnayName = require('./get-employee-by-company-name');
const makeDeleteEmployeeById = require('./delete-employee-by-id');
const makeDeleteEmployeeByCompanyId = require('./delete-employee-by-company-id');
const makeVerifyEmployee = require('./verify-employee');
const makeLoginEmployee = require('./login-employee');
const makeGetEmployeeLocation = require('./get-employee-location');
const makeGetAllSessions = require('./get-all-sessions');
const makeSearchSessions = require('./search-sessions');
const makeDeleteSessions = require('./delete-sessions');

// Call to maker functions 
const insertEmployee = makeInsertEmployee({
    insertEmployeeDb: dbMethods.cockroach.employeeDbMethods.insertEmployee,
    isEmailExistDb: dbMethods.cockroach.employeeDbMethods.isEmailExist,
    validationError: exceptions.validationError,
    objectNotFound: exceptions.objectNotFound,
    forbiddenError: exceptions.forbiddenError,
    getCompanyIdByName,
    producer,
    axios,
    Joi,
    jwt,
});

const updateEmployeeName = makeUpdateEmployeeName({
    updateEmployeeNameDb: dbMethods.cockroach.employeeDbMethods.updateEmployeeName,
    validationError: exceptions.validationError,
    Joi,
});

const getEmployeeById = makeGetEmployeeById({
    getEmployeeByIdDb: dbMethods.cockroach.employeeDbMethods.getEmployeebyId,
    validationError: exceptions.validationError,
    Joi,
});

const updateEmployeeDesignation = makeUpdateEmployeeDesignation({
    updateEmployeeDesignationDb: dbMethods.cockroach.employeeDbMethods.updateEmployeeDesignation,
    validationError: exceptions.validationError,
    Joi,
});

const getEmployeeByCompanyName = makeGetEmployeeByCompnayName({
    getEmployeeByCompanyIdDb: dbMethods.cockroach.employeeDbMethods.getEmployeeByCompanyId,
    getCompanyIdByName,
    validationError: exceptions.validationError,
    axios,
    Joi,
});

const deleteEmployeeById = makeDeleteEmployeeById({
    deleteEmployeeByIdDb: dbMethods.cockroach.employeeDbMethods.deleteEmployeeById,
    validationError: exceptions.validationError,
    Joi,
});

const deleteEmployeeByCompanyId = makeDeleteEmployeeByCompanyId({
    deleteEmployeeByCompanyIdDb: dbMethods.cockroach.employeeDbMethods.deleteEmployeeByCompanyId,
    validationError: exceptions.validationError,
    Joi,
});

const verifyEmployee = makeVerifyEmployee({
    updateVerificationstatusDb: dbMethods.cockroach.employeeDbMethods.updateVerificationStatus,
    jwt,
});

const getEmployeeLocation = makeGetEmployeeLocation({
    ipinfo,
});

const getAllSessions = makeGetAllSessions({
    getAllSessionsDb: dbMethods.cockroach.authDbMethods.getAllSessions,
})

const searchSessions = makeSearchSessions({
    searchSessionsDb: dbMethods.cockroach.authDbMethods.searchSessions,
})

const deleteSessions = makeDeleteSessions({
    deleteSessionsDb: dbMethods.cockroach.authDbMethods.deleteSessions,
})

const loginEmployee = makeLoginEmployee({
    isEmailExistDb: dbMethods.cockroach.employeeDbMethods.isEmailExist,
    insertAuthDetailsDb: dbMethods.cockroach.authDbMethods.insertAuthDetails,
    validationError: exceptions.validationError,
    forbiddenError: exceptions.forbiddenError,
    objectNotFound: exceptions.objectNotFound,
    uuid,
    Joi,
    jwt,
});


module.exports = Object.freeze({
    deleteEmployeeByCompanyId,
    updateEmployeeDesignation,
    getEmployeeByCompanyName,
    getEmployeeLocation,
    updateEmployeeName,
    deleteEmployeeById,
    getEmployeeById,
    insertEmployee,
    verifyEmployee,
    loginEmployee,
    getAllSessions,
    searchSessions,
    deleteSessions,
})