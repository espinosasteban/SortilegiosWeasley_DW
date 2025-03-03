import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    productos: [
        {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
            cantidad: { type: Number, required: true, default: 1 }
        }
    ],
    total: { type: Number, required: true, default: 0 }
});

// Middleware para calcular el total antes de guardar
carritoSchema.pre("save", async function (next) {
    let total = 0;
    for (const item of this.productos) {
        const producto = await mongoose.model("Producto").findById(item.producto);
        if (producto) {
            total += producto.precio * item.cantidad;
        }
    }
    this.total = total;
    next();
});

const Carrito = mongoose.model("Carrito", carritoSchema, "carritos");
export default Carrito;