import express from "express";
import seccionController from '../controllers/seccionController.js';
const route = express.Router();

route.post('/', seccionController.create);
route.get('/', seccionController.getAll);
route.get('/:id', seccionController.getOne);


export default route;