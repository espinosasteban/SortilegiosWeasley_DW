import express from "express";
import carritoController from '../controllers/carritoController.js';
import { authMiddleware } from '../middlewares/cors.js';

const route = express.Router();

route.post('/', carritoController.create);
route.get('/', carritoController.getAll);
route.put('/:id', carritoController.update);
route.delete('/:id', carritoController.delete);
route.get('/:id', carritoController.getOne);
// Migrar de un carrito de invitados a uno con usuario
route.post('/migrar', authMiddleware, carritoController.migrarCarrito);

export default route;
