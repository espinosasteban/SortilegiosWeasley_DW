import Direccion from "../modelos/direccion.js";
import { validarDireccion, validarDireccionParcial } from "../esquemas/esquemas.js";

class direccionController {

    //Crear dirección (solo usuarios autenticados)
    async create(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.error("❌ Error: No hay usuario autenticado en la solicitud.");
                return res.status(401).json({ error: "Acceso denegado." });
            }
    
            console.log("📥 Datos recibidos en backend:", req.body);
    
            // 🔹 Eliminar `_id` si viene en el body (para evitar el error de clave duplicada)
            const { _id, ...datosConUsuario } = {
                ...req.body,
                usuario: req.user.id
            };
    
            const result = validarDireccion(datosConUsuario);
            if (!result.success) {
                console.error("❌ Error de validación:", JSON.stringify(result.error.format(), null, 2));
                return res.status(400).json({ error: result.error.format() });
            }
    
            const nuevaDireccion = new Direccion(datosConUsuario);
            await nuevaDireccion.save();
    
            console.log("✅ Dirección creada con éxito:", nuevaDireccion);
            res.status(201).json(nuevaDireccion);
    
        } catch (error) {
            console.error("❌ Error en el servidor al crear la dirección:", error);
            res.status(500).json({ error: "Error en el servidor", detalles: error.message });
        }
    }
    

    // Obtener todas las direcciones del usuario autenticado
    async getAll(req, res) {
        try {
            const direcciones = await Direccion.find({ usuario: req.user.id });
            res.status(200).json(direcciones);
        } catch (error) {
            console.error("Error obteniendo direcciones:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    //Obtener una dirección específica (solo si pertenece al usuario)
    async getOne(req, res) {
        try {
            const direccion = await Direccion.findOne({ _id: req.params.id, usuario: req.user.id });

            if (!direccion) {
                return res.status(404).json({ error: "Dirección no encontrada" });
            }

            res.status(200).json(direccion);
        } catch (error) {
            console.error("Error obteniendo dirección:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    // Actualizar dirección (solo si pertenece al usuario)
    async update(req, res) {
        try {
            if (!req.user || !req.user.id) {
                console.error("❌ Error: No hay usuario autenticado en la solicitud.");
                return res.status(401).json({ error: "Acceso denegado." });
            }
    
            console.log("📥 Datos recibidos para actualizar:", req.body);
    
            const { id } = req.params;
            const { _id, ...datosActualizados } = req.body; // 🔹 Eliminar `_id` para evitar conflictos
    
            const direccion = await Direccion.findOneAndUpdate(
                { _id: id, usuario: req.user.id }, // 🔹 Asegurar que solo actualice direcciones del usuario autenticado
                datosActualizados,
                { new: true } // 🔹 Devolver la dirección actualizada
            );
    
            if (!direccion) {
                console.log("❌ Dirección no encontrada o no pertenece al usuario.");
                return res.status(404).json({ error: "Dirección no encontrada." });
            }
    
            console.log("✅ Dirección actualizada con éxito:", direccion);
            res.status(200).json(direccion);
    
        } catch (error) {
            console.error("❌ Error actualizando la dirección:", error);
            res.status(500).json({ error: "Error en el servidor", detalles: error.message });
        }
    }
    

    // Eliminar dirección (solo si pertenece al usuario)
    async delete(req, res) {
        try {
            const direccion = await Direccion.findOneAndDelete({ _id: req.params.id, usuario: req.user.id });

            if (!direccion) {
                return res.status(404).json({ error: "Dirección no encontrada" });
            }

            res.status(200).json({ message: "Dirección eliminada con éxito" });
        } catch (error) {
            console.error("Error eliminando dirección:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
}

export default new direccionController();