const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

db.sync({ alter: true })  // Ajusta tablas para que coincidan con los modelos sin borrar datos
    .then(() => {
        console.log('✅ Base de datos sincronizada correctamente.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error al sincronizar la base de datos:', err);
    });
