const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function 
const makeGetAllSessions = require('./get-all-sessions');
const sandbox = sinon.createSandbox();

const companyDb = {
    getAllSessionsDb: ()=>{
    }
}

const getAllSessionsDbStub = sandbox.stub(companyDb, 'getAllSessionsDb');
getAllSessionsDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        id: this.id,
        columnToSort: this.columnToSort,
        sortingOrder: this.sortingOrder
    })
    return '[{"id":123}]';
})

Given ('Employee id: {string} , sorting order: {string} , column to sort: {string}', (id, sortingOrder, columnToSort)=>{
        this.id = id;
        this.sortingOrder = sortingOrder;
        this.columnToSort = columnToSort;
})
When ('Try to get all sessions', async ()=>{
    const getAllSessions = makeGetAllSessions({
        validationError: exception.validationError,
        getAllSessionsDb: companyDb.getAllSessionsDb,
        Joi,
    })

    try {
        this.result = await getAllSessions({
            id: this.id, 
            columnToSort: this.columnToSort, 
            sortingOrder: this.sortingOrder
        })
    }
    catch(error){
        this.error = {
            name: error.name,
            message: error.message,
        }
    }

})

Then ('It will throw error: {string} with message: "{string}"', (error, message)=>{
    expect(this.error).deep.equal({
        name: error,
        message
    })
})

Then ('It will give all session details: "{string}"', (sessionDetails)=>{
    expect(this.result).deep.equal(sessionDetails);
})
