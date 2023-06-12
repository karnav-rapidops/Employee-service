const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

const makeUpdateEmployeeName = require('./update-employee-name');
const sandbox = sinon.createSandbox();

const employeeDb = {
    updateEmployeeNameDb: ()=>{
    },
}

const updateEmployeeNameDbStub = sandbox.stub(employeeDb, 'updateEmployeeNameDb');
updateEmployeeNameDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        empid: this.empid,
        empname: this.empname,
    })

    return "123";
})

Given ('Employee details name: {string}, employeeid: {string}', (empname, empid)=>{
    this.empid = empid;
    this.empname = empname;
})

When ('Try to update employee name', async ()=>{
    const updateEmployeeName = makeUpdateEmployeeName({
        updateEmployeeNameDb: employeeDb.updateEmployeeNameDb,
        validationError: exception.validationError,
        Joi,
    })
    
    try {
        this.result = await updateEmployeeName({ 
            empid: this.empid, 
            empname: this.empname,
        })
    }
    catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
})

Then ('It will throw error: {string} with message: "{string}" while updating employee name', (error, message)=>{
    expect(this.error).deep.equal({
        name: error,
        message,
      });
})

Then ('It will update employee name with details : "{string}"', (updatedEmployeeDetail)=>{
    expect(this.result).deep.equal(updatedEmployeeDetail);
})
