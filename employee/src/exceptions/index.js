const validationError = require('./validation.error');
const forbiddenError = require('./forbidden.error');
const objectNotFound = require('./object-not-found.error');
const databaseError = require('./database.error');

module.exports = {
  validationError,
  forbiddenError,
  objectNotFound,
  databaseError,
};
