import express from "express";
import loginRoutes from "./loginRoutes.js"
import usuarioRoutes from "./usuariosRoutes.js";
import clientesRoutes from "./clientesRoutes.js";
import arquivosRoutes from "./arquivosRoutes.js";
import servicoesRoutes from "./servicoesRoutes.js";
import cargosRoutes from "./cargosRoutes.js";
import appsRoutes from "./appsRoutes.js"

const routes = (app) => {
    app.get('/', (req, res) => {
        res.status(200).send({ titulo: "Server iniciado" });
    })

    app.use(express.json(),
        loginRoutes,
        usuarioRoutes,
        clientesRoutes,
        arquivosRoutes,
        servicoesRoutes,
        cargosRoutes,
        appsRoutes,
    );
};

export default routes;
