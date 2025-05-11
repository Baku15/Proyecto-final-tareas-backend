// routes/usuarioRutas.js

const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion, obtenerUsuario } = require('../controllers/usuarioControlador');
const verificarToken = require('../middlewares/verificarToken');

// Ruta para registrar un nuevo usuario
router.post('/registro', registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

// Ruta protegida para obtener información del usuario autenticado
router.get('/me', verificarToken, obtenerUsuario);

module.exports = router;
