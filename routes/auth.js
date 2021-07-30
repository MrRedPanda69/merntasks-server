// Rutas para autenticar users 
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// Iniciar sesion 
// api/auth 
router.post('/',
    authController.authUsuario
);

// Obtiene user auth 
router.get('/',
    auth,
    authController.usuarioAuth
)

module.exports = router;