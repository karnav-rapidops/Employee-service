const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

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

// kafka producer stub
const kafka = {
  producer: ()=>{

  }
}

// emaildb stub object

const emailDb = {
  isEmailExistDb : ()=>{

  }
}

const isEmailExistDbStub = sandbox.stub(emailDb, 'isEmailExistDb')
isEmailExistDbStub.callsFake((args)=>{

  console.log("\nisEmailExist-stub");
  console.log("args:", args);
  console.log("this.email: ", this.email);

  expect(args).deep.equal({ email: this.email })

  return ;

})

const insertEmployeeDbStub = sandbox.stub(employeeDb, 'insertEmployeeDb')

insertEmployeeDbStub.callsFake((args)=>{

  console.log("\ninsertEmployeeDb-stub-called")
  console.log("args: ", args);

  expect(args).deep.equal({
    name: this.name,
    designation: this.designation,
    email: this.email,
    companyId: this.id,
    password: this.password,
  })
  return '{"id": 1}';

})

const getCompanyIdByNameStub = sandbox.stub(internalServiceCall, 'getCompanyIdByName');
getCompanyIdByNameStub.callsFake((args)=>{
  console.log("\nGetCompanyIdByNameStub-called")
  console.log("args: ", args);
  console.log("this.result: ", this.companyName);

  expect(args).deep.equal({
    name: this.companyName
  })
  this.id = '1234';
  return this.id
})

const producerStub = sandbox.stub(kafka, 'producer');
producerStub.callsFake((args)=>{
    console.log("\nproducer-stub-called");
    return
})

Given ("Employee details name: {string}, email: {string} , designation: {string} , companyname: {string} , password: {string} to create new employee", (name, email, designation, companyName, password)=>{

    this.name = name || undefined;
    this.email = email || undefined;
    this.designation = designation || undefined;
    this.companyName = companyName || undefined;
    this.password = password || undefined
})

When('Try to create new employee', async () => {
    const insertEmployee = makeInsertEmployee({
        insertEmployeeDb: employeeDb.insertEmployeeDb,
        isEmailExistDb: emailDb.isEmailExistDb,
        validationError: exception.validationError, 
        getCompanyIdByName: internalServiceCall.getCompanyIdByName,
        producer: kafka.producer,
        Joi,
        jwt
        
    }); 
  
    try {

      this.result = await insertEmployee({
        name: this.name,
        email: this.email,
        designation: this.designation,
        companyName: this.companyName,
        password: this.password,
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

  console.log("This.result", this.result)
  console.log("newEmp: ", newEmployeeDetails)

  expect(this.result).deep.equal(newEmployeeDetails)
});
