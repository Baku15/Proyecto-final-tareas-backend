// routes/usuarioRutas.js

const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion } = require('../controllers/usuarioControlador');

// Ruta para registrar un nuevo usuario
router.post('/registro', registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

module.exports = router;