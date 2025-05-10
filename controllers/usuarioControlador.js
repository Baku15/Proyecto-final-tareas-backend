// controllers/usuarioControlador.js

const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Controlador para registrar un nuevo usuario
 */
const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, contrasena } = req.body;

        // Verificamos si el usuario ya existe
        const existeUsuario = await Usuario.findOne({ where: { email } });
        if (existeUsuario) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
        }

        // Encriptamos la contraseña
        const contrasenaHash = await bcrypt.hash(contrasena, 10);

        // Creamos el nuevo usuario
        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            contrasena: contrasenaHash,
        });

        res.status(201).json({ mensaje: 'Usuario registrado correctamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario.', error });
    }
};

/**
 * Controlador para iniciar sesión
 */
const iniciarSesion = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        // Verificamos si el usuario existe
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        // Verificamos la contraseña
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contrasenaValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        // Creamos el token JWT
        const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        res.json({
            mensaje: 'Inicio de sesión exitoso.',
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión.', error });
    }
};

module.exports = {
    registrarUsuario,
    iniciarSesion,
};
