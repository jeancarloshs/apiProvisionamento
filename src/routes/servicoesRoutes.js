import express from "express";
import ServicosController from "../controllers/ServicosController.js";
import verifyJWT from "../middleware/jwt.js";

const router = express.Router();

router
    .get("/listaServicos/:app", verifyJWT, ServicosController.listaTipoDeServico)
    .post("/criarTipoDeServico", verifyJWT, ServicosController.criarTipoDeServico)
    .post("/atualizaTipoDeServico/:id", verifyJWT, ServicosController.atualizaTipoDeServico)
    .delete("/deletarTipoDeServico/:app/:id", verifyJWT, ServicosController.deletarTipoDeServico)

export default router