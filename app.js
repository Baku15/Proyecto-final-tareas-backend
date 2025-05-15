const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const rutasUsuario = require("./routes/usuarioRutas");
const rutasTarea = require("./routes/tareaRutas");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", rutasUsuario);
app.use("/api/tasks", rutasTarea);

module.exports = app; // Exportar solo la app, sin iniciar el servidor aquí
