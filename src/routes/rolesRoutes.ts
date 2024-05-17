import express from "express";
import RolesController from "../controllers/RolesController";
import verifyJWT from "../middleware/jwt";

const router = express.Router();

router
    .get("/listaCargos", verifyJWT, RolesController.listaCargo)

export default router;
