const nodemailer = require('nodemailer');

const makeSendEmail = require('./send-email');

const sendEmail = makeSendEmail({
    nodemailer,
});


module.exports = Object.freeze({
    sendEmail,
})