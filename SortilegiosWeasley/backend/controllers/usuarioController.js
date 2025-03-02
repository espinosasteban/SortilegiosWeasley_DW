import Usuario from '../modelos/usuario.js';
import {validarUsuario, validarUsuarioParcial} from '../esquemas/esquemas.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

class usuarioController {

    async create(req, res) {
        try {
            // Datos válidos para 'Crear Cuenta'
            const result = validarUsuario({
                nombreUsuario: req.body.nombreUsuario,
                contrasena: req.body.contrasena,
                correo: req.body.correo,
                rol: "muggle",
                nombre: req.body.nombre || "Nombre predeterminado", 
                apellido: req.body.apellido || "Apellido predeterminado",
                documento: req.body.documento || "00000", 
                telefonoPersonal: req.body.telefonoPersonal || "0000000000", 
                fechaNacimiento: req.body.fechaNacimiento || "2000-01-01"
            });

            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }

            // Crear usuario con valores predeterminados
            const usuario = new Usuario({
                nombreUsuario: req.body.nombreUsuario,
                contrasena: req.body.contrasena,
                correo: req.body.correo,
                rol: "muggle",
                nombre: req.body.nombre || "Nombre predeterminado",
                apellido: req.body.apellido || "Apellido predeterminado",
                documento: req.body.documento || "00000",
                telefonoPersonal: req.body.telefonoPersonal || "0000000000",
                fechaNacimiento: req.body.fechaNacimiento || "2000-01-01"
            });

            const nuevoUsuario = await usuario.save();
            console.log("✅ Usuario creado con éxito:", nuevoUsuario);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            console.error("❌ Error creando el usuario:", error);
            res.status(500).json({ error: "Error creando el usuario" });
        }
    }
    

    async getAll(req, res) {
        try {
            const usuarios = await Usuario.find();
            res.status(200).json(usuarios);
            console.log("Usuarios obtenidos con éxito");
        } catch (error) {
            console.log("Error obteniendo los usuarios");
            res.status(500).json({error: 'Error obteniendo los usuarios'});
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            let usuario = null;
    
            // Verificar si el ID es un ObjectId válido
            if (mongoose.Types.ObjectId.isValid(id)) {
                usuario = await Usuario.findById(id);
            }
    
            // Si no es un ObjectId válido, buscar por nombreUsuario
            if (!usuario) {
                usuario = await Usuario.findOne({ nombreUsuario: id });
            }
    
            if (usuario) {
                res.status(200).json(usuario);
                console.log("Usuario obtenido con éxito");
            } else {
                console.log("Usuario no encontrado");
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.log("Error obteniendo el usuario", error);
            res.status(500).json({ error: 'Error obteniendo el usuario' });
        }
    }

    async update(req, res) {
        try {
            const result = validarUsuarioParcial(req.body);

            if (!result.sucess){
                return res.status(400).json({ error: JSON.parse(result.error.message) })
            }
            
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });

            if (usuario) {
                res.status(200).json(usuario);
                console.log("Usuario actualizado con éxito");
            } else {
                console.log("Usuario no encontrado");
                res.status(404).json({error: 'Usuario no encontrado'});
            }
        }
        catch (error) {
            console.log("Error actualizando el usuario");
            res.status(500).json({error: 'Error actualizando el usuario'});
        }
    }

    async delete(req, res) {
        try { 
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndDelete(id);

            if (usuario) {
                res.status(200).json(usuario);
                console.log("Usuario eliminado con éxito");
            } else {
                console.log("Usuario no encontrado");
                res.status(404).json({error: 'Usuario no encontrado'});
            }
        }
        catch (error) {
            console.log("Error eliminando el usuario");
            res.status(500).json({error: 'Error eliminando el usuario'});
        }
    }

    async cambiarContrasena(req, res) {
        try {
            const { id } = req.params;
            const { nuevaContrasena } = req.body;
    
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
    
            // Validar nueva contraseña
            const regex = /^(?=.*[A-Z])(?=.*[.,*?%_])(?=.{8,})/;
            if (!regex.test(nuevaContrasena)) {
                return res.status(400).json({ error: "La nueva contraseña no cumple con los requisitos." });
            }
            usuario.contrasena = nuevaContrasena;
            await usuario.save();
            res.status(200).json({ mensaje: "Contraseña cambiada exitosamente" });
        } catch (error) {
            console.error("❌ Error cambiando la contraseña:", error);
            res.status(500).json({ error: "Error cambiando la contraseña" });
        }
    }      
}
export default new usuarioController();
