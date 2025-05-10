// app.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Permitir peticiones del frontend
app.use(express.json()); // Parsear JSON del cuerpo

// (Las rutas se agregarán luego)

module.exports = app;
