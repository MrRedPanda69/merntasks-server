const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer token del header
    const token = req.header('x-auth-token');
    
    // Revisar si no hay
    if(!token) res.status(201).json({ msg: 'No hay token, permiso no valido'});

    // Validar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token invalido' });
    }
    
}