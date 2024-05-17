import express from "express";
import { Request, Response } from "express";
import loginRoutes from "./loginRoutes"
import usuarioRoutes from "./usuariosRoutes";
import clientesRoutes from "./clientesRoutes";
import archivesRoutes from "./archivesRoutes";
import servicoesRoutes from "./servicoesRoutes";
import rolesRoutes from "./rolesRoutes";
import appsRoutes from "./appsRoutes"

const routes = (app: any) => {
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send({ titulo: "Server iniciado" });
    })

    app.use(express.json(),
        loginRoutes,
        usuarioRoutes,
        clientesRoutes,
        archivesRoutes,
        servicoesRoutes,
        rolesRoutes,
        appsRoutes,
    );
};

export default routes;
