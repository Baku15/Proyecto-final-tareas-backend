// routes/tareaRutas.js

const express = require('express');
const verificarToken = require('../middlewares/verificarToken');
const tareaControlador = require('../controllers/tareaControlador');


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

// Buscar por título o descripción (?query=...)
router.get('/search', verificarToken, tareaControlador.buscarTareas);

// Filtrar solo por estado (?status=pendiente o completada)
router.get('/filter-by-status', verificarToken, tareaControlador.filtrarTareasPorEstado);

// Filtrado avanzado (título, estado, fecha) (?title=..., status=..., dueDate=...)
router.get('/filter', verificarToken, tareaControlador.filtrarTareasAvanzado);

// Obtener una tarea en específico (DEBE ir después de las otras rutas GET)
router.get('/:id', verificarToken, tareaControlador.obtenerTareaPorId);

// Actualizar tarea (también con :id, por eso abajo)
router.put('/:id', actualizarTarea);

// Eliminar tarea por ID
router.delete('/:id', eliminarTarea);

module.exports = router;
