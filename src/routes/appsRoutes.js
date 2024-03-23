import express from "express";
import AppController from "../controllers/AppController.js";
import verifyJWT from "../middleware/jwt.js";

const router = express.Router();

router
    .get("/listaApps", verifyJWT, AppController.listaApps)

export default router;