const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

db.sync({ force: true }) // Si realmente necesitas recrear la base de datos cada vez, esta opción es válida. Sino, cambia a `{ alter: true }`.
    .then(() => {
        console.log('✅ Base de datos recreada.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error al sincronizar la base de datos:', err);
    });
