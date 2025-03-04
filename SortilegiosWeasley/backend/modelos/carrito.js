import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },  // Un solo carrito por usuario
    items: [
        {
            productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            total_items: Number
        }
    ]
});

// Middleware para calcular el total antes de guardar
carritoSchema.pre("save", async function (next) {
    let total = 0;
    for (const item of this.items) {
        const producto = await mongoose.model("Producto").findById(item.productoId);
        if (producto) {
            total += producto.precio * item.total_items;
        }
    }
    this.total = total;
    next();
});

const Carrito = mongoose.model("Carrito", carritoSchema, "carritos");
export default Carrito;