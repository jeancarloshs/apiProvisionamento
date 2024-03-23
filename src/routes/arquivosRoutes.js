import express from "express";
import ArquivosController from "../controllers/ArquivosController.js";
import verifyJWT from "../middleware/jwt.js";

const router = express.Router();

router
    .get("/listaArquivos/:app", verifyJWT, ArquivosController.listaArquivos)
    .post("/inserirArquivo", verifyJWT, ArquivosController.inserirArquivo)
    .post("/atualizarArquivo/:id", verifyJWT, ArquivosController.atualizarArquivo)
    .delete("/deletarArquivo/:app/:id", verifyJWT, ArquivosController.deletarArquivo)

export default router;