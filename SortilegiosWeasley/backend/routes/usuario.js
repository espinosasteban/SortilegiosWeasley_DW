import express from "express";
import usuarioController from '../controllers/usuarioController.js';
import { authMiddleware } from "../middlewares/cors.js";

const route = express.Router();

route.post('/', usuarioController.create);
route.get('/', usuarioController.getAll);
route.put('/:id', usuarioController.update);
route.delete('/:id', usuarioController.delete);
route.get('/:id', usuarioController.getOne);
route.put('/cambiarContrasena/:id', usuarioController.cambiarContrasena);

export default route;