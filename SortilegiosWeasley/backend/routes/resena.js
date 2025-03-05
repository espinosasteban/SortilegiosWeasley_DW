import express from "express";
import resenaController from '../controllers/resenaController.js';
const route = express.Router();
import { authMiddleware } from "../middlewares/cors.js";

route.post('/', authMiddleware, resenaController.create);
route.get('/', resenaController.getAll);
route.put('/:id', authMiddleware, resenaController.update);
route.delete('/:id', authMiddleware, resenaController.delete);
route.get('/:id', resenaController.getOne);
route.get('/usuario/:id', authMiddleware, resenaController.getResenaUsuario);


export default route;