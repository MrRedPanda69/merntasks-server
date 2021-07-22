const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) res.status(400).json({ errores: errores.array() });
    
    try {
        // Crear nuevo proyecto 
        const proyecto = new Proyecto(req.body);

        // Guardar creador via jwt 
        proyecto.creador = req.usuario.id;

        // Guardar proyecto
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtiene todos los proyectos del usuario actual
exports.getProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ crado: -1 });
        res.json({ proyectos });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualiza un proyecto
exports.updateProyecto = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) res.status(400).json({ errores: errores.array() });

    // Extraer info del proyecto
    const { nombre } = req.body;
    const newProyecto = {};

    if(nombre) newProyecto.nombre = nombre;

    try {
        // Revisar ID
        let proyecto = await Proyecto.findById(req.params.id);

        // Revisar si existe el proyecto
        if(!proyecto) res.status(404).json({ msg: 'Ups, proyecto no encontrado :c' });

        // Verificar creador del proyecto
        if( proyecto.creador.toString() !== req.usuario.id ) res.status(401).json({ msg: 'Ups, no estás autorizador para esto :/'});

        // Update
        proyecto = await Proyecto.findOneAndUpdate({ _id: req.params.id }, { $set: newProyecto }, { new: true });
        res.json({ proyecto });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el server');
    }
}

// Eliminar Proyecto por ID
exports.deleteProyecto = async (req, res) => {
    try {
        // Revisar ID
        let proyecto = await Proyecto.findById(req.params.id);

        // Revisar si existe el proyecto
        if(!proyecto) res.status(404).json({ msg: 'Ups, proyecto no encontrado :c' });

        // Verificar creador del proyecto
        if( proyecto.creador.toString() !== req.usuario.id ) res.status(401).json({ msg: 'Ups, no estás autorizador para esto :/'});

        // Eliminar Proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Proyecto eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el server');
    }
}