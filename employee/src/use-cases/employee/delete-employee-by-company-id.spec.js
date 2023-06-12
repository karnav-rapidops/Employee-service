const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function
const makeDeleteEmployeeByCompanyId = require('./delete-employee-by-company-id');

// EmployeeDb object containing function wich will become stub

const employeeDb = {
    deleteEmployeeByCompanyIdDb: ()=>{

    }
}

const deleteEmployeeDbStub = sinon.stub(employeeDb, 'deleteEmployeeByCompanyIdDb');
deleteEmployeeDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        cid: this.cid,
    })

    return "Employee deleted!"
})

Given ('Company id: {string}', (cid)=>{
    this.cid = cid || undefined;
})

When('Try to delete employee', async ()=>{
    const deleteEmployeeByCompnayId = makeDeleteEmployeeByCompanyId({
        deleteEmployeeByCompanyIdDb: employeeDb.deleteEmployeeByCompanyIdDb,
        validationError: exception.validationError,
        Joi,
    })

    try{
        this.result = await deleteEmployeeByCompnayId({ cid: this.cid })
    }
    catch(e)
    {
        this.error = {
            name: e.name,
            message: e.message,
        }
    }
})  

Then ('It will throw error: {string} with message: "{string}" while deleting employee', (error, message)=>{
    expect(this.error).deep.equal({
        name: error,
        message,
    });
})

Then('It will delete employee with message: "{string}"', (message)=>{
    console.log(this.result);
    console.log(message);
    expect(this.result).deep.equal(
        message
    )
})  
