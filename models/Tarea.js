// models/Tarea.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tarea = sequelize.define('Tarea', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    completada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Tarea;
