import express from "express";
import usuarioController from '../controllers/usuarioController.js';
const route = express.Router();

route.post('/', usuarioController.create);
route.get('/', usuarioController.getAll);
route.put('/:id', usuarioController.update);
route.delete('/:id', usuarioController.delete);
route.get('/:id', usuarioController.getOne);

export default route;