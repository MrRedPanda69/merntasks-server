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

// Get tareas por proyecto
exports.getTarea = async (req, res) => {
    try {
        // Extraer Proyecto y checar si existe
        const { proyecto } = req.query;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) res.status(404).json({ msg: 'Ups, proyecto no encontrado :c'});

        // Revisar si proyecto actual pertenece al user
        if( existeProyecto.creador.toString() !== req.usuario.id ) res.status(401).json({ msg: 'Ups, no estás autorizado para esto :/'});

        // Get tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
        res.json({ tareas });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Update tarea
exports.updateTarea = async (req, res) => {
    try {
        // Extraer Proyecto y checar si existe
        const { proyecto, nombre, estado } = req.body;

        // Revisar si tarea exite
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) res.status(404).json({ msg: 'Ups, tarea no encontrada :c'});

        // Extraer proyecto 
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si proyecto actual pertenece al user
        if( existeProyecto.creador.toString() !== req.usuario.id ) res.status(401).json({ msg: 'Ups, no estás autorizado para esto :/'});

        // Crear obj con la nueva info 
        const newTarea = {};

        newTarea.nombre = nombre;
        newTarea.estado = estado;


        // Guardar tarea 
        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, newTarea, { new: true });
        res.json({ tarea });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Delete tarea
exports.deleteTarea = async (req, res) => {
    try {
        // Extraer Proyecto y checar si existe
        const { proyecto } = req.query;

        // Revisar si tarea exite
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) res.status(404).json({ msg: 'Ups, tarea no encontrada :c'});

        // Extraer proyecto 
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si proyecto actual pertenece al user
        if( existeProyecto.creador.toString() !== req.usuario.id ) res.status(401).json({ msg: 'Ups, no estás autorizado para esto :/'});

        // Eliminar 
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
