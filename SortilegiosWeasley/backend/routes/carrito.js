import express from "express";
import CarritoController from '../controllers/carritoController.js';
import { authMiddleware } from '../middlewares/cors.js';

const route = express.Router();

route.post('/',authMiddleware, CarritoController.create);
route.get('/:id',authMiddleware, CarritoController.getOne);     
route.put('/:id',authMiddleware, CarritoController.update);
route.delete('/:id',authMiddleware, CarritoController.delete);
route.post('/migrar',authMiddleware, CarritoController.migrarCarrito);


export default route;
