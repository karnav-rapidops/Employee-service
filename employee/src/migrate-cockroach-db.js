const {Sequelize} = require('sequelize')
const {Umzug, SequelizeStorage} = require('umzug')

    const sequelize = new Sequelize({
    // database : "employee",
    // username : "root",
    // password : "",    
    // host: "cockroach_node1",
    // dialect: "postgres",
    // port:26257,
    // // dialectOptions: {
    // //     ssl: {
    // //         rejectUnauthorized: false,
    // //     }
    // // }
    // ssl: false,

    host: 'localhost',
    username: 'max',
    password: 'cockroach',
    port: 26257,
    database: 'employee',
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
    
    });
        
        const umzug = new Umzug({
            migrations: { glob: "migrations/cockroach/*.js"},
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({sequelize}),
            logger: console,
        });

        (async () => await umzug.up())();
