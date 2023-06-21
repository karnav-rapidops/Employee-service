const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function
const makeSearchSessions = require('./search-sessions');

const sandbox = sinon.createSandbox();

const authDb = {
    searchSessionDb : ()=>{
    }
}

const searchSessionsDbStub = sandbox.stub(authDb, 'searchSessionDb');
searchSessionsDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        id: this.id, 
        searchField: this.searchField, 
        searchValue: this.searchValue, 
        sortingOrder: this.sortingOrder,
    })
    return '[{"id":123}]'
})


Given ('Employee id: {string} , search column: {string} , search value: {string} , sorting order: {string}', (id,           searchField, searchValue, sortingOrder)=>{
    this.id = id;
    this.searchField = searchField;
    this.searchValue = searchValue;
    this.sortingOrder = sortingOrder;
})

When ('Try to get sessions', async ()=>{
    const searchSessions = makeSearchSessions({
        searchSessionsDb: authDb.searchSessionDb,   
        validationError: exception.validationError,
        Joi,
    })

    try {
        this.result = await searchSessions({
            searchField: this.searchField, 
            searchValue: this.searchValue, 
            sortingOrder: this.sortingOrder,
            id: this.id, 
        })
    } catch (error) {
        this.error = {
            name: error.name,
            message: error.message,
        }
    }
})

Then ('It will give sessionsDetails: "{string}"', (sessionsDetails)=>{
    expect(this.result).deep.equal(sessionsDetails);
})

Then ('It will give error: {string} with message: "{string}"', (error, message)=>{
    expect(this.error).deep.equal({
        name: error,
        message
    })
})



