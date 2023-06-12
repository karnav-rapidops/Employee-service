const jwt = require('jsonwebtoken');
const exception = require('../exceptions');
const { authDbMethods } = require('../data-access/cockroach'); 
const makeVerifyAccessToken = require('./verifyAccessToken');


const verifyAccessToken = makeVerifyAccessToken({
    updateExpireTimeDb: authDbMethods.updateExpireTime,
    getExpireTimeDb: authDbMethods.getExpireTime,
    forbiddenError: exception.forbiddenError,
    jwt,
});

module.exports = Object.freeze({
    verifyAccessToken,
    
})