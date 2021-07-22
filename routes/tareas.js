const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// Crear Tarea 
// api/tareas 
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

module.exports = router;