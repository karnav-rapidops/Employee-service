const employee = require('./employee');
const email = require('./email');
const kafka = require('./kafka');
const file  = require('./file')

module.exports = Object.freeze({
    employee,
    email,
    kafka,
    file
})