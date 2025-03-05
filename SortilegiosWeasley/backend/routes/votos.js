import express from "express";
import votoController from '../controllers/votosController.js';
import { authMiddleware } from "../middlewares/cors.js";

const route = express.Router();

route.get('/', authMiddleware, votoController.obtenerVotosUsuario);
route.post('/', authMiddleware, votoController.registrarVoto);

export default route;