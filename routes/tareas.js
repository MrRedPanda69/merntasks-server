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
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

// Obtener Tareas por proyecto
router.get('/',
    auth,
    tareaController.getTarea
);

// Update tarea
router.put('/:id',
    auth,
    tareaController.updateTarea
);

// Delete tarea
router.delete('/:id',
    auth,
    tareaController.deleteTarea
);

module.exports = router;