const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    name: {                      // ← en inglés
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {                 // ← en inglés
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

Usuario.associate = function (models) {
    Usuario.hasMany(models.Tarea, {
        foreignKey: 'usuarioId',
        as: 'tareas',
        onDelete: 'CASCADE',
    });
};
module.exports = Usuario;

