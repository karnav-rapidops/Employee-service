const jwt = require('jsonwebtoken');

const text = 'karnav'

const encryptedToken = jwt.sign({ text }, 'mysecret' );

console.log(encryptedToken);