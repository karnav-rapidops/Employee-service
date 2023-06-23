const jwt = require('jsonwebtoken');
const exception = require('../exceptions');
const multer = require('multer');
const { authDbMethods } = require('../data-access/cockroach'); 
const { getRole } = require('../use-cases/role')
const { getRoleId } = require('../use-cases/employee-role-association');
const permissions = require('../utility/enum');


// Import use-case maker functions
const makeVerifyAccessToken = require('./verifyAccessToken');
const makeCheckPermission = require('./check-permission');

// Call to use-case maker functions
const verifyAccessToken = makeVerifyAccessToken({
    updateExpireTimeDb: authDbMethods.updateExpireTime,
    getExpireTimeDb: authDbMethods.getExpireTime,
    forbiddenError: exception.forbiddenError,
    jwt,
});
const checkPermission = makeCheckPermission({
    getRole,
    getRoleId, 
    permissions,
})


module.exports = Object.freeze({
    verifyAccessToken,
    checkPermission,
})