// routes/tareaRutas.js

const express = require('express');
const router = express.Router();
const autenticarJWT = require('../middlewares/verificarToken');
const {
    crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea,
} = require('../controllers/tareaControlador');

// Todas las rutas están protegidas
router.use(autenticarJWT);

// Crear nueva tarea
router.post('/', crearTarea);

// Obtener todas las tareas del usuario
router.get('/', obtenerTareas);

// Actualizar tarea
router.put('/:id', actualizarTarea);

// Eliminar tarea
router.delete('/:id', eliminarTarea);

module.exports = router;
