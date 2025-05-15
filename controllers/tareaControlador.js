// controllers/tareaControlador.js

const Tarea = require('../models/Tarea');

/**
 * Crear una nueva tarea
 */
const crearTarea = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        const nuevaTarea = await Tarea.create({
            title,
            description,
            status,         // debe ser 'pendiente' o 'completada'
            dueDate,        // formato YYYY-MM-DD
            usuarioId: req.usuario.id, // ID extraído del token
        });

        res.status(201).json(nuevaTarea);
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ mensaje: 'Error al crear la tarea.', error });
    }
};

/**
 * Obtener todas las tareas del usuario autenticado
 */
const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.findAll({
            where: { usuarioId: req.usuario.id },
            order: [['createdAt', 'DESC']],
        });

        res.json(tareas);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ mensaje: 'Error al obtener tareas.', error });
    }
};

/**
 * Actualizar una tarea existente
 */
const actualizarTarea = async (req, res) => {
    try {
        const id = req.params.id;

        const tarea = await Tarea.findOne({ where: { id, usuarioId: req.usuario.id } });

        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada.' });
        }

        const { title, description, status, dueDate } = req.body;

        await tarea.update({
            title,
            description,
            status,
            dueDate,
        });

        res.json({ mensaje: 'Tarea actualizada.', tarea });
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        res.status(500).json({ mensaje: 'Error al actualizar tarea.', error });
    }
};

/**
 * Eliminar una tarea
 */
const eliminarTarea = async (req, res) => {
    try {
        const id = req.params.id;

        const tarea = await Tarea.findOne({ where: { id, usuarioId: req.usuario.id } });

        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada.' });
        }

        await tarea.destroy();
        res.json({ mensaje: 'Tarea eliminada correctamente.' });
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ mensaje: 'Error al eliminar tarea.', error });
    }
};

module.exports = {
    crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea,
};
