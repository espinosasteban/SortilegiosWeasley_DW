import mongoose from "mongoose";

const votoSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    resenaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resena', required: true },
    tipo: { type: String, enum: ['recuentoUtil', 'recuentoNoUtil'], required: true },
}, { timestamps: true });

const Voto = mongoose.model('Voto', votoSchema, 'votos');
export default Voto;