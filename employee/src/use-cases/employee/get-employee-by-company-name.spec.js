const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function
const makeGetEmployeeByCompanyName = require('./get-employee-by-company-name');

const sandbox = sinon.createSandbox();

const employeeDb = {
    getEmployeeByCompanyIdDb: ()=>{
    }
}

const getEmployeeByCompanyIdDbStub = sandbox.stub(employeeDb, 'getEmployeeByCompanyIdDb');
getEmployeeByCompanyIdDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        id: this.id,
    })
    return '[{"id": 123}]';
})

const internalServiceCall = {
    getCompnayIdByName: ()=>{
    }
}

const getCompnayIdByNameStub = sandbox.stub(internalServiceCall, 'getCompnayIdByName');
getCompnayIdByNameStub.callsFake((args)=>{
    expect(args).deep.equal({
        companyName: this.companyName,
    })
    this.id = '456';
    return this.id;
})

Given ('company name: {string}', (companyName)=>{
    this.companyName = companyName;
})

When ('Try to get employee by company name', async()=>{
    const getEmployeeByCompnayName = makeGetEmployeeByCompanyName({
        getEmployeeByCompanyIdDb: employeeDb.getEmployeeByCompanyIdDb,
        getCompanyIdByName: internalServiceCall.getCompnayIdByName,
        validationError: exception.validationError,
        Joi,
    })

    try {
        this.result = await getEmployeeByCompnayName({
            companyName: this.companyName,
        })
    } catch (error) {
        this.error = {
            name: error.name,
            message: error.message,
        }
    }
})

Then ('It will give employeesDetail: "{string}"', (employeesDetail)=>{
    expect(this.result).deep.equal(employeesDetail);
})

Then ('It will give error: {string} with message: "{string}" while giving employee details', (error, message)=>{
    expect(this.error).deep.equal({
        name: error,
        message,
    })
})



