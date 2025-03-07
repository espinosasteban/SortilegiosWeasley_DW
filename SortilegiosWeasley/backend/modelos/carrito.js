import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },  // Un solo carrito por usuario
    items: [
        {
            productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            total_items: { type: Number, default: 1}
        }
    ]}, {
    timestamps: true
});

const Carrito = mongoose.model("Carrito", carritoSchema, "carritos");
export default Carrito;