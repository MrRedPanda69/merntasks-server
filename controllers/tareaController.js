const Tarea = require('../models/Tareas');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// Crear nueva tarea
exports.crearTarea = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) res.status(400).json({ errores: errores.array() });

    try {
        // Extraer Proyecto y checar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) res.status(404).json({ msg: 'Ups, proyecto no encontrado :c'});

        // Revisar si proyecto actual pertenece al user
        if( existeProyecto.creador.toString() !== req.usuario.id ) res.status(401).json({ msg: 'Ups, no estás autorizado para esto :/'});

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}