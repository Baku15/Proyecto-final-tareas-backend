const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const rutasUsuario = require("./routes/usuarioRutas");
const rutasTarea = require("./routes/tareaRutas");

const app = express();
app.use(cors());
app.use(express.json()); // <- Asegúrate de tener esto

// Rutas
app.use("/api/usuarios", rutasUsuario);
app.use("/api/tareas", rutasTarea);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
module.exports = app;
