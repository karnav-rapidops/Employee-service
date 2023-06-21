const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function
const makeDeleteEmployeeById = require('./delete-employee-by-id');

const sandBox = sinon.createSandbox();

const employeeDb = {
    deleteEmployeeByIdDb: ()=>{
    }
}

const deleteEmployeeByIdDbStub = sandBox.stub(employeeDb, 'deleteEmployeeByIdDb');
deleteEmployeeByIdDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        id: this.id,
    })
    return '1';
})

Given ('Employee id: {string}', (id)=>{
    this.id = id;
})

When ('Try to delete employee by employee id', async ()=>{
    const deleteEmployeeById = makeDeleteEmployeeById({
        deleteEmployeeByIdDb: employeeDb.deleteEmployeeByIdDb,
        validationError: exception.validationError,
        Joi,
    })

    try {
        this.result = await deleteEmployeeById({
            id: this.id,
        })
    } catch (error) {
        this.error = {
            name: error.name,
            message: error.message,
        }
    }
})

Then ('It will throw error: {string} with message: "{string}" while deleting employee with employee id', (error, message)=>{
    expect(this.error).deep.equal({
        name: error,
        message
    })
})

Then ('It will delete employee using employee id and gives deleted employee id: {string}', (id)=>{
    expect(this.result).deep.equal(id);
})
