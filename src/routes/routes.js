import express from "express";
import ProvisionamentoController from "../controllers/ProvisionamentoController.js";
import UsuarioController from "../controllers/UsuarioController.js";
import AuthController from "../controllers/AuthController.js";
import ArquivosController from "../controllers/ArquivosController.js";
import verifyJWT from "../middleware/jwt.js"
import ServicosController from "../controllers/ServicosController.js";

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

    .get("/listaArquivos", verifyJWT, ArquivosController.listaArquivos)
    .get("/listaServicos", verifyJWT, ServicosController.listaTipoDeServico)


    .post("/login", AuthController.login)
    .post("/provisionaClientes", verifyJWT, ProvisionamentoController.provisionaClientes)
    .post("/inserirUsuario", verifyJWT, UsuarioController.inserirUsuario)

    .delete("/removeCliente/:id", verifyJWT, ProvisionamentoController.removeCliente)
    .delete("/deletarUsuario/:id", verifyJWT, UsuarioController.deletarUsuario)

export default router;
