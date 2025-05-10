// models/Tarea.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');

// Definimos el modelo de Tarea con sus reglas de negocio
const Tarea = sequelize.define('Tarea', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'en progreso', 'completada'),
        defaultValue: 'pendiente',
    },
    fechaLimite: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'tareas',
    timestamps: true,
});

// Relación: una tarea pertenece a un usuario
Tarea.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Tarea, { foreignKey: 'usuarioId' });

module.exports = Tarea;
