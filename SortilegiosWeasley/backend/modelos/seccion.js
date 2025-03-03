import mongoose from 'mongoose';

const seccionSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String }
});

const Seccion = mongoose.model('Seccion', seccionSchema, 'secciones');
export default Seccion;