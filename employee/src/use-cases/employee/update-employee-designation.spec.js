const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const exceptions = require('../../exceptions');
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateEmployeeDesignation = require('./update-employee-designation');
const sandbox = sinon.createSandbox();

const employeeDb = {
    updateEmployeeDesignationDb: ()=>{
    }
}

const updateEmployeeDesignationDbStub = sandbox.stub(employeeDb, 'updateEmployeeDesignationDb')

updateEmployeeDesignationDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        empid: this.empid,
        designation: this.designation,
    })

    return 'employee is updated'
})

Given('Employee details name: {string}, designation: {string}', (empid, designation)=>{
    this.empid = empid;
    this.designation = designation;
});

When('Try to update employee designation', async ()=>{
    const updateEmployeeDesignation = makeUpdateEmployeeDesignation({
        updateEmployeeDesignationDb: employeeDb.updateEmployeeDesignationDb,
        validationError: exceptions.validationError,
        Joi,
    })
    try {
        this.result = await updateEmployeeDesignation({
            empid: this.empid,
            designation: this.designation,
        })   
    } 
    catch (error) {
        this.error = {
            name: error.name,
            message: error.message,
        }
    }
})

Then('It will throw error: {string} with message: "{string}" while updating employee designation', (error, message)=> {

    expect(this.error).deep.equal({
        name: error,
        message
    })
})  

Then('It will update new employee with message: "{string}"', (message)=>{
    expect(this.result).deep.equal(message)
})

