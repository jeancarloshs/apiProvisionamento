import express from "express";
import { Request, Response } from "express";
import loginRoutes from "./login.Routes"
import usuarioRoutes from "./usuarios.Routes";
import clientesRoutes from "./clientes.Routes";
import archivesRoutes from "./archives.Routes";
import servicoesRoutes from "./servicoes.Routes";
import rolesRoutes from "./roles.Routes";
import appsRoutes from "./apps.Routes"

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