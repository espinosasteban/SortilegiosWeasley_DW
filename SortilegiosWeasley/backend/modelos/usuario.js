import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    rol: { type: String, required: true, enum: ["muggle", "admin"]}, // Enum para restringir valores
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true },
    telefonoPersonal: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
});

// Hash de contraseña antes de guardar un usuario
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('contrasena')) return next();
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');
export default Usuario;