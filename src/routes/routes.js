import express from "express";
import ProvisionamentoController from "../controllers/ProvisionamentoController.js";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('server iniciado')
})

router
    .get("/listaUsuarios", UsuarioController.listaUsuarios)
    .get("/listaUsuarios/:id", UsuarioController.listaUsuario)

    .get("/listaClientes", ProvisionamentoController.listaClientes)
    .get("/buscaCliente", ProvisionamentoController.buscaCliente)
    .get("/buscaServicoTecnico", ProvisionamentoController.buscaServicoTecnico)
    .get("/buscaServicoSuporte", ProvisionamentoController.buscaServicoSuporte)
    .get("/buscaSerialNumber", ProvisionamentoController.buscaSerialNumber)
    .get("/buscaTipoDeServico", ProvisionamentoController.buscaTipoDeServico)

export default router;
