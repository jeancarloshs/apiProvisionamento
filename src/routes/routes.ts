import express from "express";
import { Request, Response } from "express";
import loginRoutes from "./loginRoutes"
import usuarioRoutes from "./usuariosRoutes";
import clientesRoutes from "./clientesRoutes";
import arquivosRoutes from "./arquivosRoutes";
import servicoesRoutes from "./servicoesRoutes";
import cargosRoutes from "./cargosRoutes";
import appsRoutes from "./appsRoutes"

const routes = (app: any) => {
    app.get('/', (req: Request, res: Response) => {
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
