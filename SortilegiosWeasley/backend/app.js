import 'dotenv/config';
import express from 'express';
import routesProductos from './routes/producto.js';
import routesSecciones from './routes/seccion.js';
import routesUsuarios from './routes/usuario.js';
import routesResenas from './routes/resena.js';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import { corsMiddleware } from './middlewares/cors.js';

const app = express();

//MIDDLEWARES NECESARIOS PARA EL FUNCIONAMIENTO DE LA APLICACIÓN
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(corsMiddleware());

//RUTAS NECESARIAS PARA LOS MÉTODOS RELACIONADOS A LAS COLECCIONES
app.use('/producto', routesProductos);
app.use('/seccion', routesSecciones);
app.use('/usuario', routesUsuarios);
app.use('/resenas', routesResenas);

//CONEXIÓN A LA BD
mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.SERVER_DB}/SortilegiosWeasley?retryWrites=true&w=majority&appName=Sortilegios`)
    .then(() => console.log('🔥 Conectado a MongoDB'))
    .catch(err => console.error('❌ Error conectando a MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));