const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Crear server 
const app = express();

// Conectar a DB 
connectDB();

// Habilitar cors 
app.use( cors() );

// Habilitar express.json
app.use(express.json({ extended: true }));

// Puerto de la app 
const port = process.env.port || 4000;

// Importar rutas 
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server corriendo en el puerto ${port}`);
})