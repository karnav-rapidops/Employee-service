const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken')

const makeVerifyEmployee = require('./verify-employee');
const verifyEmployee = require('./verify-employee');

const sandBox = sinon.createSandbox();

const employeeDb = {
    updateVerificationstatusDb: ()=>{
    }
}

const updateVerificationstatusDbStub = sandBox.stub(employeeDb, 'updateVerificationstatusDb');
updateVerificationstatusDbStub.callsFake((args)=>{
    return;
})

Given ('Employee token: {string}', (token)=>{
    this.token = token;
})
When ('Try to verify employee', async ()=>{
    const verifiyEmployee = makeVerifyEmployee({
        updateVerificationstatusDb: employeeDb.updateVerificationstatusDb,
        jwt,
    })

    try {
        this.result = await verifiyEmployee({
            verificationToken: this.token
        })
    } catch (error) {
        this.error = {
            name: error.name,
            message: error.message,
        }
    }
}) 
Then ('It will verify employee with message: {string}', (message)=>{
    console.log(this.result, " ", message);
    expect(this.result).deep.equal(message);
})
