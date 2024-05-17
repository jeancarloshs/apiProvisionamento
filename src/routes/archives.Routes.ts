import express from "express";
import ArchivesController from "../controllers/ArchivesController";
import verifyJWT from "../middleware/jwt";

const router = express.Router();

router
    .get("/listaArquivos/:app", verifyJWT, ArchivesController.listaArquivos)
    .post("/inserirArquivo", verifyJWT, ArchivesController.inserirArquivo)
    .post("/atualizarArquivo/:id", verifyJWT, ArchivesController.atualizarArquivo)
    .delete("/deletarArquivo/:app/:id", verifyJWT, ArchivesController.deletarArquivo)

export default router;