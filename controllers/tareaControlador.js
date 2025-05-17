const { Op } = require('sequelize');
const Tarea = require('../models/Tarea');

/**
 * Crear una nueva tarea
 */
const crearTarea = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        // Validar que dueDate no sea una fecha pasada
        if (dueDate) {
            const fechaActual = new Date();
            const fechaTarea = new Date(dueDate);

            // Ajustar la hora para comparar solo la fecha, ignorando horas/minutos/segundos
            fechaActual.setHours(0, 0, 0, 0);
            fechaTarea.setHours(0, 0, 0, 0);

            if (fechaTarea < fechaActual) {
                return res.status(400).json({ mensaje: 'La fecha de vencimiento no puede ser anterior a hoy.' });
            }
        }

        const nuevaTarea = await Tarea.create({
            title,
            description,
            status,
            dueDate,
            usuarioId: req.usuario.id,
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
        const usuarioId = req.usuario.id;  // <-- aquí se define
        const orden = req.query.orden;
        const dueDate = req.query.dueDate; // ✅ Extraer dueDate
        const filtros = { usuarioId };     // ✅ Inicializar filtros

// Orden por defecto
        let ordenamiento = [['createdAt', 'DESC']];

        if (orden) {
            if (orden.toLowerCase() === 'antiguos') {
                ordenamiento = [['createdAt', 'ASC']];
            } else if (orden.toLowerCase() === 'recientes') {
                ordenamiento = [['createdAt', 'DESC']];
            }
        }


// ✅ Filtro por dueDate si viene como query param
        if (dueDate) {
            const startOfDay = new Date(dueDate);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(dueDate);
            endOfDay.setHours(23, 59, 59, 999);

            filtros.dueDate = {
                [Op.between]: [startOfDay, endOfDay]
            };
        }

        console.log('Orden aplicado en obtenerTareas:', ordenamiento);

        const tareas = await Tarea.findAll({
            where: filtros,
            order: ordenamiento,
        });


        res.json(tareas);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ mensaje: 'Error al obtener tareas.', error });
    }
};

const obtenerTareaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await Tarea.findByPk(id);  // o el método que uses para buscar
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tarea', error: error.message });
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

/**
 * Buscar tareas por texto (título o descripción)
 */
const buscarTareas = async (req, res) => {
    const query = req.query.query?.toLowerCase();
    const usuarioId = req.usuario.id;

    try {
        const tareas = await Tarea.findAll({
            where: {
                usuarioId,
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } }
                ]
            }
        });

        res.json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar tareas', error });
    }
};

/**
 * Filtrar tareas por estado
 */
const filtrarTareasPorEstado = async (req, res) => {
    const status = req.query.status;
    const usuarioId = req.usuario.id;

    try {
        const tareas = await Tarea.findAll({
            where: {
                usuarioId,
                status
            }
        });

        res.json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al filtrar tareas', error });
    }
};

/**
 * Filtrar tareas por múltiples parámetros: título, estado, fecha, orden, rango fechas
 */


const filtrarTareasAvanzado = async (req, res) => {
    try {
        const { title, status, orden, fechaInicio, fechaFin } = req.query;
        const usuarioId = req.usuario.id;

        const filtros = { usuarioId };

        // Filtrar por título (busqueda parcial)
        if (title) {
            filtros.title = { [Op.iLike]: `%${title}%` };
        }

        // Filtrar por estado
        if (status) {
            filtros.status = status;
        }

        // Filtrar por rango de fecha de creación
        if (fechaInicio && fechaFin) {
            filtros.dueDate = {
                [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
            };
        }

        // Ordenar por fecha de creación
        let ordenamiento = [['createdAt', 'DESC']];
        if (orden) {
            if (orden.toLowerCase() === 'recientes') {
                ordenamiento = [['createdAt', 'DESC']];
            } else if (orden.toLowerCase() === 'antiguos') {
                ordenamiento = [['createdAt', 'ASC']];
            }
        }

        console.log('Filtros usados:', filtros);
        console.log('Orden aplicado:', ordenamiento);

        const tareas = await Tarea.findAll({
            where: filtros,
            order: ordenamiento,
        });

        res.json(tareas);
    } catch (error) {
        console.error('Error al filtrar tareas:', error);
        res.status(500).json({
            mensaje: 'Error al filtrar tareas',
            error: error.message,
        });
    }
};

module.exports = {
    crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea,
    buscarTareas,
    filtrarTareasPorEstado,
    filtrarTareasAvanzado,
    obtenerTareaPorId,

};
