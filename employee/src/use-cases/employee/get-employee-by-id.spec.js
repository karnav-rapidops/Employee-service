const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

const makeGetEmployeeById = require('./get-employee-by-id');
const sandbox = sinon.createSandbox();

const employeeDb = {
    getEmployeeByIdDb: ()=>{
    },
}

const getEmployeeByIdDbStub = sandbox.stub(employeeDb, 'getEmployeeByIdDb');
getEmployeeByIdDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        empid: this.empid,
    })
    return '{"id": 123}'
})

Given ('Employee details employee id: {string}', (empid)=>{
    this.empid = empid || undefined;
})

When ('Try to get employee', async ()=>{
    const getEmployeeByid = makeGetEmployeeById({
        getEmployeeByIdDb: employeeDb.getEmployeeByIdDb,
        validationError: exception.validationError,
        Joi,
    })

    try {
        this.result = await getEmployeeByid({ 
            empid :this.empid
        })
    }
    catch(e) {
        this.error = {
            name: e.name,
            message: e.message,
        };
    }
})

Then ('It will throw error: {string} with message: "{string}" while getting employee', (error, message)=>{
    expect(this.error).deep.equal({
        name: error,
        message,
    })
})

