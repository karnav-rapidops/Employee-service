const makeGetCompanyIdByName = require('./get-company-id-by-name');
const exceptions = require('../../exceptions');
const axios = require('axios');
const Joi = require('joi');

const getCompanyIdByName = makeGetCompanyIdByName({
    objectNotFound: exceptions.objectNotFound,
    axios,
    Joi,
});

module.exports = Object.freeze({
    getCompanyIdByName,
})