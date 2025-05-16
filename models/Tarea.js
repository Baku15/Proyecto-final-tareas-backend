const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tarea = sequelize.define('Tarea', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM('pendiente', 'completada'),
        defaultValue: 'pendiente',
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true, // Puedes poner false si es obligatorio
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'tasks',
    timestamps: true,
});

module.exports = Tarea;
