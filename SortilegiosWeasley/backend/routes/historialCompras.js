import express from "express";
import HistorialCompraController from "../controllers/historialCompras.js"
import { authMiddleware } from "../middlewares/cors.js";

const route = express.Router();

route.get("/:userId", authMiddleware, (req, res) => HistorialCompraController.getHistorialCompras(req, res));
route.post("/", authMiddleware, (req, res) => HistorialCompraController.addHistorialCompra(req, res));

export default route;