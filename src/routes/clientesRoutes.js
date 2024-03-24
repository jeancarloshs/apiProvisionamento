import express, { Router } from "express";
import ProvisionamentoController from "../controllers/ProvisionamentoController.js";
import verifyJWT from "../middleware/jwt.js";

const router = express.Router();

router
    .get("/listaClientes/:app", verifyJWT, ProvisionamentoController.listaClientes)
    .get("/buscaCliente/:app", verifyJWT, ProvisionamentoController.buscaCliente)
    .get("/buscaServicoTecnico/:app", verifyJWT, ProvisionamentoController.buscaServicoTecnico)
    .get("/buscaServicoSuporte/:app", verifyJWT, ProvisionamentoController.buscaServicoSuporte)
    .get("/buscaSerialNumber/:app/:id", verifyJWT, ProvisionamentoController.buscaSerialNumber)
    .get("/buscaPatrimonio/:app/:id", verifyJWT, ProvisionamentoController.buscaPatrimonio)
    .get("/buscaTipoDeServico/:app", verifyJWT, ProvisionamentoController.buscaTipoDeServico)
    .post("/provisionaClientes", verifyJWT, ProvisionamentoController.provisionaClientes)
    .delete("/removeCliente/:app/:id", verifyJWT, ProvisionamentoController.removeCliente)

export default router;