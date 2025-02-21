import express from 'express';
import productoController from '../controllers/productoController.js';
const route = express.Router();

route.post('/', productoController.create);
route.put('/:id', productoController.update);
route.delete('/:id', productoController.delete);
route.get('/', productoController.getAll);
route.get('/:id', productoController.getOne);

export default route;