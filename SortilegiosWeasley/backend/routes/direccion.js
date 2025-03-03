import express from "express";
import direccionController from '../controllers/direccionController.js';
const route = express.Router();

route.post('/', direccionController.create);
route.get('/', direccionController.getAll);
route.put('/:id', direccionController.update);
route.delete('/:id', direccionController.delete);
route.get('/:id', direccionController.getOne);

export default route;