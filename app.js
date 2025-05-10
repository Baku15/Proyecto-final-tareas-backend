// app.js

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas de usuario
const rutasUsuario = require('./routes/usuarioRutas');
app.use('/api/usuarios', rutasUsuario);

module.exports = app;