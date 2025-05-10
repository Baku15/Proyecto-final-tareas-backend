// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definimos el modelo de Usuario con Sequelize
const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // No se pueden repetir correos
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'usuarios',
    timestamps: true,
});

module.exports = Usuario;
