import express from "express";
import perfilController from '../controllers/perfilController.js';
import { authMiddleware } from "../middlewares/cors.js";

const route = express.Router();

route.get("/", authMiddleware, perfilController.getProfile);
route.put("/", authMiddleware, perfilController.updateProfile);

export default route;