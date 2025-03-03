import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import { corsMiddleware, authMiddleware } from './middlewares/cors.js';
import routesProductos from './routes/producto.js';
import routesSecciones from './routes/seccion.js';
import routesUsuarios from './routes/usuario.js';
import routesResenas from './routes/resena.js';
import authRoutes from './routes/auth.js';
import routesDireccion from './routes/direccion.js';

const app = express();

// ✅ 1. Configurar middlewares en el orden correcto
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ 2. Asegurar que CORS se use correctamente
app.use(corsMiddleware);

// ✅ 3. Definir rutas
app.use('/producto', routesProductos);
app.use('/seccion', routesSecciones);
app.use('/usuario', routesUsuarios);
app.use('/resenas', routesResenas);
app.use('/auth', authRoutes);
app.use('/mis-direcciones', authMiddleware, routesDireccion); // 🔹 Protegemos la ruta

// ✅ 4. Conectar a MongoDB
mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.SERVER_DB}/SortilegiosWeasley?retryWrites=true&w=majority&appName=Sortilegios`)
    .then(() => console.log('🔥 Conectado a MongoDB'))
    .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// ✅ 5. Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
