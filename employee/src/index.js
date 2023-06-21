// Required express.js to create a server. Using port 3000 for company service
const express = require('express');
const app = express();
const port = 3001;
const router = require('./rest-service')
require('dotenv').config();

app.use(express.json());
app.use('/', router);
app.use(express.static('public'))

app.listen(port, ()=>{
    console.log(`Employee service running on port ${port}`);
})

