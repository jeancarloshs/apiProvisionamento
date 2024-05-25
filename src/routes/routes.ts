import express from "express";
import { Request, Response } from "express";
import loginRoutes from "./login.Routes"
import usersRoutes from "./users.Routes";
import clientesRoutes from "./clientes.Routes";
import archivesRoutes from "./archives.Routes";
import servicoesRoutes from "./servicoes.Routes";
import rolesRoutes from "./roles.Routes";
import appsRoutes from "./apps.Routes";
import spreadSheetRoutes from "./spreadsheet.Routes";

const routes = (app: any) => {
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send({ message: "Server is running" });
    })

    app.use(express.json(),
        loginRoutes,
        usersRoutes,
        clientesRoutes,
        archivesRoutes,
        servicoesRoutes,
        rolesRoutes,
        appsRoutes,
        spreadSheetRoutes
    );
};

export default routes;
