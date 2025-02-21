import 'dotenv/config';
import express from 'express';
import routesProductos from './routes/producto.js';

const app = express();

app.use('/producto', routesProductos);

try{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
    console.log(error);
}