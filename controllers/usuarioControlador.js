// controllers/usuarioControlador.js

const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Controlador para registrar un nuevo usuario
 */
const registrarUsuario = async (req, res) => {
    try {
        // Esto mostrará lo que llega en el cuerpo de la solicitud
        console.log('Datos recibidos en el registro:', req.body);

        const { name, email, password } = req.body;

        // Verificamos si los campos son válidos
        if (!name || !email || !password) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
        }

        // Verificamos si el usuario ya existe
        const existeUsuario = await Usuario.findOne({ where: { email } });
        if (existeUsuario) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
        }

        // Encriptamos la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Creamos el nuevo usuario
        const nuevoUsuario = await Usuario.create({
            name,
            email,
            password: passwordHash,
        });

        res.status(201).json({ mensaje: 'Usuario registrado correctamente.' });
    } catch (error) {
        console.error('Error en el registro:', error.message);  // Muestra el mensaje de error en consola
        res.status(500).json({ mensaje: 'Error al registrar usuario.', error: error.message });
    }
};

/**
 * Controlador para iniciar sesión
 */
const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign({ id: usuario.id, name: usuario.name }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        console.log('Login exitoso:', { usuario: usuario.email, token });  // <-- LOG

        res.json({
            mensaje: 'Inicio de sesión exitoso.',
            token,
            usuario: { id: usuario.id, name: usuario.name, email: usuario.email },
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión.', error });
    }
};


const obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id, {
            attributes: ['id', 'name', 'email']
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuario.', error });
    }
};


module.exports = {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuario,
};
