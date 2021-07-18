// Rutas para crear users 
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Crear user 
// api/usuarios 
router.post('/',
    usuarioController.crearUsuario
);

module.exports = router;