import express from "express";
import ProvisionamentoController from "../controllers/ProvisionamentoController.js";
import UsuarioController from "../controllers/UsuarioController.js";
import AuthController from "../controllers/AuthController.js";
import verifyJWT from "../middleware/jwt.js"

const router = express.Router();

router.get('/', (req, res) => {
    res.send('server iniciado')
})

router
    .get("/listaUsuarios", verifyJWT, UsuarioController.listaUsuarios)
    .get("/listaUsuarios/:id", verifyJWT, UsuarioController.listaUsuario)

    .get("/listaClientes", verifyJWT, ProvisionamentoController.listaClientes)
    .get("/buscaCliente", verifyJWT, ProvisionamentoController.buscaCliente)
    .get("/buscaServicoTecnico", verifyJWT, ProvisionamentoController.buscaServicoTecnico)
    .get("/buscaServicoSuporte", verifyJWT, ProvisionamentoController.buscaServicoSuporte)
    .get("/buscaSerialNumber/:id", verifyJWT, ProvisionamentoController.buscaSerialNumber)
    .get("/buscaPatrimonio/:id", verifyJWT, ProvisionamentoController.buscaPatrimonio)
    .get("/buscaTipoDeServico", verifyJWT, ProvisionamentoController.buscaTipoDeServico)


    .post("/provisionaClientes", verifyJWT, ProvisionamentoController.provisionaClientes)
    .post("/login", AuthController.login)

    .delete("/removeCliente/:id", verifyJWT, ProvisionamentoController.removeCliente)

export default router;
