import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
    puntuacion: { type: Number, required: true },
    fecha: { type: Date, required: true, default: Date.now },
    comentario: { type: String, required: true },
    recuentoUtil: { type: Number, required: true, default: 0 },
    recuentoNoUtil: { type: Number, required: true, default: 0 },
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Muggle' }
}, { timestamps: true });

const Resena = mongoose.model('Resena', resenaSchema);

export default Resena;
