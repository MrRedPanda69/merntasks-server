const Usuario = require('../models/Usuario');

exports.crearUsuario = async (req, res) => {
    try {
        let usuario;
        
        // Crea el nuevo user
        usuario = new Usuario(req.body);

        // Guardar user 
        await usuario.save();

    } catch(error) {

    }
}