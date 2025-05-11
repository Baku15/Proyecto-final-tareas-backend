// middlewares/verificarToken.js

const jwt = require('jsonwebtoken');

/**
 * Middleware para proteger rutas con autenticación JWT
 */
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado.' });
    }

    try {
        const tokenSinBearer = token.split(' ')[1]; // Extraemos el token real
        const verificado = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
        req.usuario = verificado; // Guardamos los datos del usuario
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
};

module.exports = verificarToken;
