const express = require('express');
const connectDB = require('./config/db');

// Crear server 
const app = express();

// Conectar a DB 
connectDB();

// Puerto de la app 
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
})