import express from "express";
import UserController from "../controllers/UserController";
import verifyJWT from "../middleware/jwt"

const router = express.Router();

router
    .get("/listUsers/:app", verifyJWT, UserController.listUsers)
    .get("/listUser/:app/:id", verifyJWT, UserController.listUser)
    // .post("/inserirUsuario", verifyJWT, UserController.inserirUsuario)
    // .post("/atualizarUsuario/:id", verifyJWT, UserController.atualizarUsuario)
    // .delete("/deletarUsuario/:id", verifyJWT, UserController.deletarUsuario)

export default router;