import express from "express";
import direccionController from '../controllers/direccionController.js';
import { authMiddleware } from "../middlewares/cors.js";

const route = express.Router();

route.post("/", authMiddleware, direccionController.create);
route.get("/", authMiddleware, direccionController.getAll);
route.get("/:id", authMiddleware, direccionController.getOne);
route.put("/:id", authMiddleware, direccionController.update);
route.delete("/:id", authMiddleware, direccionController.delete);

export default route;