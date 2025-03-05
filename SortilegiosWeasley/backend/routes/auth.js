import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../modelos/usuario.js'; 

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET; 

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
    console.log("Solicitud recibida en /auth/login");
    console.log("Cuerpo de la solicitud:", req.body);

    if (!req.body.nombreUsuario || !req.body.contrasena) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }
    
    try {
        const usuario = await Usuario.findOne({ nombreUsuario });
        if (!usuario) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }

        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contrasenaValida) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        // Crear token JWT
        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token, rol: usuario.rol, id: usuario._id });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

export default router;