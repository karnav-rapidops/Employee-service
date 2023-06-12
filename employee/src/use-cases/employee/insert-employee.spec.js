const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function
const makeInsertEmployee = require('./insert-employee');
const sandbox = sinon.createSandbox();

// employeeDb object for function which will be stub
const employeeDb = {
    insertEmployeeDb: ()=>{
    },
}

// Employee service stub object 
const internalServiceCall = {
  getCompanyIdByName : ()=>{

  }
}

const insertEmployeeDbStub = sandbox.stub(employeeDb, 'insertEmployeeDb')

insertEmployeeDbStub.callsFake((args)=>{

  expect(args).deep.equal({
    empname: this.empname,
    email: this.email,
    designation: this.designation,
    cid: this.cid,
  })

  return '{"id": 1}';

})

const getCompanyIdByNameStub = sandbox.stub(internalServiceCall, 'getCompanyIdByName');

getCompanyIdByNameStub.callsFake((args)=>{
  
  expect(args).deep.equal({
    cname: this.cname
  })
  this.cid = '1234';
  return this.cid
})


Given('Employee details name: {string}, email: {string} , designation: {string} , companyname: {string} to create new employee', (empname, email, designation, cname)=>{

    this.empname = empname || undefined;
    this.email = email || undefined;
    this.designation = designation || undefined;
    this.cname = cname || undefined;
})

When('Try to create new employee', async () => {
    const insertEmployee = makeInsertEmployee({
        insertEmployeeDb: employeeDb.insertEmployeeDb,
        validationError: exception.validationError, 
        getCompanyIdByName: internalServiceCall.getCompanyIdByName,
        Joi,
        
    }); 
  
    try {
      this.result = await insertEmployee({
        empname: this.empname,
        email: this.email,
        designation: this.designation,
        cname: this.cname,
       
      });  
    } 
    catch (e) {
      this.error = {
        name: e.name,
        message: e.message,
      };
    }
});

Then('It will throw error: {string} with message: "{string}" while creating new employee', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  });

Then('It will create new employee with details: "{string}"', (newEmployeeDetails) => {
  expect(this.result).deep.equal(newEmployeeDetails)
});
