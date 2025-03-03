import mongoose from "mongoose";

const direccionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    departamento: { type: String, required: true },
    municipio: { type: String, required: true },
    direccion: { type: String, required: true },
    barrio: { type: String, required: true },
    info_extra: { type: String, required: false },
    recibidor: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

const Direccion = mongoose.model('Direccion', direccionSchema, 'direcciones');
export default Direccion;

