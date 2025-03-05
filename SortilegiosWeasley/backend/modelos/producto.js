
import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    img: { type: String, required: true },
    precio: { type: Number, required: true },
    unidadesStock: { type: Number, required: true, default: 0 },
    seccion: { type: mongoose.Schema.Types.ObjectId, ref: 'Seccion' }
});

const Producto = mongoose.model('Producto', productoSchema, 'productos');
export default Producto;