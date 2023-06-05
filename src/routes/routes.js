import express from "express";
import ProvisionamentoController from "../controllers/ProvisionamentoController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('server iniciado')
})

router
    .get("/listaUsuarios", ProvisionamentoController.listaUsuarios)
    .get("/listaUsuarios/:id", ProvisionamentoController.listaUsuario)
    .get("/listaClientes", ProvisionamentoController.listaClientes)

export default router;
