// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Se crea la instancia de Sequelize con los datos del archivo .env
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false // Evita mostrar las consultas en consola
    }
);

// Se exporta la instancia para usar en los modelos
module.exports = sequelize;