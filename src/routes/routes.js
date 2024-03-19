import express from "express";
import ProvisionamentoController from "../controllers/ProvisionamentoController.js";
import UsuarioController from "../controllers/UsuarioController.js";
import AuthController from "../controllers/AuthController.js";
import ArquivosController from "../controllers/ArquivosController.js";
import verifyJWT from "../middleware/jwt.js"
import ServicosController from "../controllers/ServicosController.js";
import CargoController from "../controllers/CargoController.js";
import AppController from "../controllers/AppController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('server iniciado')
})

router
    .get("/listaUsuarios/:app", verifyJWT, UsuarioController.listaUsuarios)
    .get("/listaUsuario/:app/:id", verifyJWT, UsuarioController.listaUsuario)

    .get("/listaClientes", verifyJWT, ProvisionamentoController.listaClientes)
    .get("/buscaCliente", verifyJWT, ProvisionamentoController.buscaCliente)
    .get("/buscaServicoTecnico", verifyJWT, ProvisionamentoController.buscaServicoTecnico)
    .get("/buscaServicoSuporte", verifyJWT, ProvisionamentoController.buscaServicoSuporte)
    .get("/buscaSerialNumber/:id", verifyJWT, ProvisionamentoController.buscaSerialNumber)
    .get("/buscaPatrimonio/:id", verifyJWT, ProvisionamentoController.buscaPatrimonio)
    .get("/buscaTipoDeServico", verifyJWT, ProvisionamentoController.buscaTipoDeServico)

    .get("/listaArquivos/:app", verifyJWT, ArquivosController.listaArquivos)
    .get("/listaServicos/:app", verifyJWT, ServicosController.listaTipoDeServico)
    .get("/listaCargos", verifyJWT, CargoController.listaCargo)

    .get("/listaApps", verifyJWT, AppController.listaApps)

    .post("/login", AuthController.login)
    .post("/provisionaClientes", verifyJWT, ProvisionamentoController.provisionaClientes)

    .post("/inserirUsuario", verifyJWT, UsuarioController.inserirUsuario)
    .post("/atualizarUsuario/:id", verifyJWT, UsuarioController.atualizarUsuario)
    
    .post("/criarTipoDeServico", verifyJWT, ServicosController.criarTipoDeServico)
    .post("/atualizaTipoDeServico/:id", verifyJWT, ServicosController.atualizaTipoDeServico)

    .post("/inserirArquivo", verifyJWT, ArquivosController.inserirArquivo)
    .post("/atualizarArquivo/:id", verifyJWT, ArquivosController.atualizarArquivo)

    .delete("/removeCliente/:app/:id", verifyJWT, ProvisionamentoController.removeCliente)
    .delete("/deletarUsuario/:id", verifyJWT, UsuarioController.deletarUsuario)
    .delete("/deletarTipoDeServico/:app/:id", verifyJWT, ServicosController.deletarTipoDeServico)
    .delete("/deletarArquivo/:app/:id", verifyJWT, ArquivosController.deletarArquivo)

export default router;
