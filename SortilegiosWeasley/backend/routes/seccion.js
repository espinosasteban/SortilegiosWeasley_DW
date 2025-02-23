import express from "express";
import seccionController from '../controllers/seccionController.js';
const route = express.Router();

route.post('/', seccionController.create);

/*
route.put('/:id', productoController.update);
route.delete('/:id', productoController.delete);
route.get('/', productoController.getAll);
route.get('/:id', productoController.getOne);
*/


export default route;