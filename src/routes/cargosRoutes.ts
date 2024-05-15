import express from "express";
import CargoController from "../controllers/CargoController";
import verifyJWT from "../middleware/jwt";

const router = express.Router();

router
    .get("/listaCargos", verifyJWT, CargoController.listaCargo)

export default router;
