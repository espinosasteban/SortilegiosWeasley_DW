import express from "express";
import CarritoController from '../controllers/carritoController.js';
import { authMiddleware } from '../middlewares/cors.js';


const route = express.Router();


route.post('/addCart', authMiddleware, CarritoController.addCart)
route.get('/:id',authMiddleware, CarritoController.getOne);     
route.put('/:id',authMiddleware, CarritoController.update);
route.put('/increaseItemQty/:userId', authMiddleware, CarritoController.increaseItemQty);
route.put('/decreaseItemQty/:userId', authMiddleware, CarritoController.decreaseItemQty);

route.delete('/deleteItem/:userId', authMiddleware, CarritoController.deleteItem);
route.delete('/:id',authMiddleware, CarritoController.delete);

export default route;