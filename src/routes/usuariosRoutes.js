import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import verifyJWT from "../middleware/jwt.js"

const router = express.Router();

router
    .get("/listaUsuarios/:app", verifyJWT, UsuarioController.listaUsuarios)
    .get("/listaUsuario/:app/:id", verifyJWT, UsuarioController.listaUsuario)
    .post("/inserirUsuario", verifyJWT, UsuarioController.inserirUsuario)
    .post("/atualizarUsuario/:id", verifyJWT, UsuarioController.atualizarUsuario)
    .delete("/deletarUsuario/:id", verifyJWT, UsuarioController.deletarUsuario)

export default router;