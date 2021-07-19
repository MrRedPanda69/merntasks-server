const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.crearUsuario = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) res.status(400).json({ errores: errores.array() });

    // Extraer email y password
    const { email, password } = req.body;

    try {
        // Revisar que el user registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if(usuario) res.status(400).json({ msg: 'Este usuario ya existe' });
        
        // Crea el nuevo user
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // Guardar user 
        await usuario.save();

        // Mensaje de confirmacion
        res.json({ msg: 'Usuario creado correctamente'});

    } catch(error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}