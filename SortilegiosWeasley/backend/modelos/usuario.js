import mongoose from 'mongoose';

const muggleSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true },
    contrasena: { type: String, required: true },
    correo: { type: String, required: true },
    rol: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true },
    telefonoPersonal: { type: Number, required: true },
    fechaNacimiento: { type: Date, required: true },
});

const Muggle = mongoose.model('Muggle', muggleSchema, 'muggles');

export default Muggle;

