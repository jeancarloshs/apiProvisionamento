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
    .get("/buscaSerialNumber", verifyJWT, ProvisionamentoController.buscaSerialNumber)
    .get("/buscaTipoDeServico", verifyJWT, ProvisionamentoController.buscaTipoDeServico)


    .post("/login", AuthController.login)

export default router;