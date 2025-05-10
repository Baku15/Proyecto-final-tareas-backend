// server.js
const app = require('./app');
const sequelize = require('./config/db');

// Importar modelos para que se sincronicen
require('./models/Usuario');
require('./models/Tarea');

const PORT = process.env.PORT || 3000;

// Sincronizar con la base de datos y luego iniciar el servidor
sequelize.sync({ alter: true }) // alter: true ajusta las tablas según los modelos
    .then(() => {
        console.log('🔗 Conectado a PostgreSQL con Sequelize');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error al conectar con la base de datos:', err);
    });
