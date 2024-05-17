import express from "express";
import AppController from "../controllers/AppController";
import verifyJWT from "../middleware/jwt";

const router = express.Router();

router
    .get("/appsList", verifyJWT, AppController.appsList)

export default router;