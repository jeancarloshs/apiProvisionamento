import express from "express";
import CargoController from "../controllers/CargoController.js";
import verifyJWT from "../middleware/jwt.js";

const router = express.Router();

router
    .get("/listaCargos", verifyJWT, CargoController.listaCargo)

export default router;
