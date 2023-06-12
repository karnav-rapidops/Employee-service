const config = {
    // cockroach: {
    //     host: 'cockroach_node1',
    //     user: 'root',
    //     password: '',
    //     port: 26257,
    //     database: 'employee',
    //     ssl: false,
    // }

    cockroach: {
        host: 'localhost',
        user: 'max',
        password: 'cockroach',
        port: 26257,
        database: 'employee',
        ssl:{
            rejectUnauthorized: false
        }
    }
}

module.exports = config;