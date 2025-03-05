
import Usuario from '../modelos/usuario.js';

class perfilController {
    // Obtener la información del usuario autenticado
    async getProfile(req, res) {
        try {
            const usuario = await Usuario.findById(req.user.id).select("-contrasena"); // Excluir contraseña
            if (!usuario) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            res.json(usuario);
        } catch (error) {
            console.error("❌ Error obteniendo perfil:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    // Actualizar la información del usuario autenticado
    async updateProfile(req, res) {
        try {
            const { nombre, apellido, telefonoPersonal, fechaNacimiento, documento, correo } = req.body;
            const usuarioActualizado = await Usuario.findByIdAndUpdate(
                req.user.id,
                { nombre, apellido, telefonoPersonal, fechaNacimiento, documento, correo },
                { new: true, runValidators: true, select: "-contrasena" }
            );

            if (!usuarioActualizado) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.json(usuarioActualizado);
        } catch (error) {
            console.error("❌ Error actualizando perfil:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
}
export default new perfilController();