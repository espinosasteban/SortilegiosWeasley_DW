import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
    comentario: { type: String, required: true },
    recuentoUtil: { type: Number, required: true, default: 0 },
    recuentoNoUtil: { type: Number, required: true, default: 0 },
    producto: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Producto' },
    usuario: { type: mongoose.Schema.Types.ObjectId,  required: true, ref: 'Usuario' }
}, { timestamps: true });

const Resena = mongoose.model('Resena', resenaSchema, 'resenas');


export default Resena;
