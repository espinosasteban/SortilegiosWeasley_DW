import Resena from '../modelos/resena.js';
import {validarResena, validarResenaParcial} from '../esquemas/esquemas.js';

class resenaController {

    async create(req, res) {
        try {
            
            if (!req.user || !req.user.id) {
                console.error("❌ Error: No hay usuario autenticado en la solicitud.");
                return res.status(401).json({ error: "Acceso denegado." });
            }

            console.log("📥 Datos recibidos en backend:", req.body);
    
            // Eliminar `_id` y el usuario si viene en el body
            const { _id, ...datos } = req.body;
            const datosConUsuario = { ...datos, usuario: req.user.id };

            console.log("📥 Datos con usuario:", datosConUsuario);


            const result = validarResena(datosConUsuario);

            console.log("result", result);
            if(!result.success){
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            
            const nuevaResena = new Resena(datosConUsuario);
            await nuevaResena.save();

            console.log("resena creada con éxito", nuevaResena);
            res.status(201).json(nuevaResena);

        } catch (error) {
            console.log("Error creando la resena");
            res.status(500).json({error: 'Error creando la resena'});
        }
    }

    async getAll(req, res) {
        try {
            const resenas = await Resena.find();
            res.status(200).json(resenas);
            console.log("resenas obtenidas con éxito");
        } catch (error) {
            console.log("Error obteniendo las resenas");
            res.status(500).json({error: 'Error obteniendo las resenas'});
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const resena = await Resena.findById(id);
            if (resena) {
                res.status(200).json(resena);
                console.log("resena obtenida con éxito");
            } else {
                console.log("resena no encontrada");
                res.status(404).json({error: 'resena no encontrada'});
            }
        }
        catch (error) {
            console.log("Error obteniendo la resena");
            res.status(500).json({error: 'Error obteniendo la resena'});
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { comentario, puntuacion } = req.body;
    
            const resena = await Resena.findById(id);
            if (!resena) return res.status(404).json({ error: "Reseña no encontrada" });
    
            if (resena.usuario.toString() !== req.user.id) {
                return res.status(403).json({ error: "No tienes permiso para editar esta reseña" });
            }
    
            resena.comentario = comentario;
            resena.puntuacion = puntuacion;
            await resena.save();
    
            res.json(resena);
        } catch (error) {
            console.error("Error actualizando la reseña", error);
            res.status(500).json({ error: "Error actualizando la reseña" });
        }
    }

    async delete(req, res) {
        try { 
            const { id } = req.params;
            const resena = await Resena.findByIdAndDelete(id);

            if (resena) {
                res.status(200).json(resena);
                console.log("resena eliminada con éxito");
            } else {
                console.log("resena no encontrada");
                res.status(404).json({error: 'resena no encontrada'});
            }
        }
        catch (error) {
            console.log("Error eliminando la resena");
            res.status(500).json({error: 'Error eliminando la resena'});
        }
    }

    // Obtener la reseña del usuario autenticado para un producto
    async getResenaUsuario(req, res) {
        try {
            const { producto } = req.query;
            const usuarioId = req.user.id;

            if (!producto) {
                return res.status(400).json({ error: "Se requiere un ID de producto" });
            }

            const resena = await Resena.findOne({ usuario: usuarioId, producto });

            if (!resena) {
                return res.status(404).json(null);
            }

            res.json(resena);
        } catch (error) {
            console.error("Error obteniendo la reseña del usuario:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

}
export default new resenaController();