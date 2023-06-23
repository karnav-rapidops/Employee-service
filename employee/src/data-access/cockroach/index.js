// ------------------------- Connection part ----------------------------------------

const { Pool } = require('pg');
const config = require('../../config');
const { databaseError } = require('../../exceptions')

const pool = new Pool({
    host: config.cockroach.host,
    user: config.cockroach.user,
    password: config.cockroach.password,
    port: config.cockroach.port,
    database: config.cockroach.database,
    ssl: {
        rejectUnauthorized: false
    }
    // ssl: false,
})
pool.connect()
    .then(() => console.log(`cockroachDb connected on port ${config.cockroach.port}`))
    .catch((e) => console.error(`Error while connecting cockroachDb!\n${e}`))

// ----------------------------------- use-cases -----------------------------------------

const makeEmployeeDbMethods = require('./employee-db');
const makeAuthDbMethods = require('./auth-db');
const makeRoleDbMethods = require('./role-db');
const makeEmployeeRoleAssociationDbMethods = require('./employee-role-association-db');

const employeeDbMethods = makeEmployeeDbMethods({
    pool,
    databaseError,
});

const authDbMethods = makeAuthDbMethods({
    pool,
    databaseError,
})

const roleDbMethods = makeRoleDbMethods({
    pool,
    databaseError,
})

const employeeRoleAssociationDbMethods = makeEmployeeRoleAssociationDbMethods({
    pool,
    databaseError,
})

module.exports = Object.freeze({
    employeeDbMethods,  
    authDbMethods,
    roleDbMethods,
    employeeRoleAssociationDbMethods,
})