import mongoose from "mongoose";

const historialCompraSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
            total_items: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

const HistorialCompra = mongoose.model("HistorialCompra", historialCompraSchema, "historial_compras");
export default HistorialCompra;
