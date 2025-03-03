import express from "express";
import resenaController from '../controllers/resenaController.js';
const route = express.Router();

route.post('/', resenaController.create);
route.get('/', resenaController.getAll);
route.put('/:id', resenaController.update);
route.delete('/:id', resenaController.delete);
route.get('/:id', resenaController.getOne);

export default route;