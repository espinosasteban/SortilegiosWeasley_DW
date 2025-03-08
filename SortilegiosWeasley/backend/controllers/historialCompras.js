import HistorialCompra from "../modelos/historialCompra.js";

class HistorialCompraController {
    // Obtener historial de compras de un usuario
    async getHistorialCompras(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Usuario no autenticado" });
            }
    
            const historialCompras = await HistorialCompra.find({ usuarioId: req.user.id })
                .populate({
                    path: "items.productoId",
                    populate: { path: "seccion", select: "nombre" }
                });
    
            if (!historialCompras.length) {
                return res.status(404).json({ error: "Historial de compras no encontrado" });
            }
    
            const historialFormateado = historialCompras.map(historial => ({
                _id: historial._id,
                usuarioId: historial.usuarioId,
                items: historial.items.map(item => ({
                    _id: item.productoId._id,
                    nombre: item.productoId.nombre,
                    img: item.productoId.img,
                    precio: item.productoId.precio,
                    seccion: item.productoId.seccion ? item.productoId.seccion.nombre : "Sin sección",
                    __v: item.productoId.__v,
                    total_items: item.total_items
                }))
            }));
    
            res.json(historialFormateado);
    
        } catch (error) {
            console.error("Error obteniendo el historial de compras:", error);
            res.status(500).json({ error: "Error obteniendo el historial de compras" });
        }
    }
    

    // Registrar una nueva compra en el historial
    async addHistorialCompra(req, res) {
        try {
            const { usuarioId, items } = req.body;
    
            const nuevaCompra = new HistorialCompra({
                usuarioId,
                items
            });
    
            await nuevaCompra.save();
            res.status(201).json({ message: "Compra registrada exitosamente", nuevaCompra });
        } catch (error) {
            res.status(500).json({ error: "Error registrando la compra en el historial" });
        }
    }
}

export default new HistorialCompraController();