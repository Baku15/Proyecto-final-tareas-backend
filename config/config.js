require('dotenv').config();

module.exports = {
    development: {
        username: 'postgres',
        password: 'breick1010',
        database: 'backend-final',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    test: {
        username: 'postgres',
        password: 'breick1010',
        database: 'backend-final',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Necesario en Render
            },
        },
    },
};
