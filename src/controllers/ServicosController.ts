import db from "../config/dbConfig";
import { Request, Response } from "express";
import constants from "../constants/constants";
import {ServiceType, ServicesToMap} from "../models/tipoDeServicoModel";
import { responseModel } from "../helpers/responseModelHelper";
import { IResponse } from "../types/servicesTypes";

const response: IResponse = { ...responseModel };

export default {
  async listaTipoDeServico(req: Request, res: Response) {
    let app = req.params.app;
    response.data = [];

    try {
      const tbTipoDeServicoModel = await ServiceType.findAll({
        where: {
          "app": app
        },
        order: [
          ["id", "ASC"],
        ]
      });

      const tbTipoDeServico = ServicesToMap(tbTipoDeServicoModel);
      
      response.success = tbTipoDeServico.length > 0;

      if (response.success) {
        response.success = true;
        response.found = tbTipoDeServico.length;
        response.data = tbTipoDeServico;
      } else {
        response.error = constants["404"].noServiceFound;
      }
    } catch (e) {
      console.error("ERROR:", e);
    }
    return res.json(response);
  },

  async criarTipoDeServico(req: Request, res: Response) {
    const { tipoDeServico, app } = req.body;
    let query = "";

    try {
      // query = await db`
      // INSERT INTO "tbTipoDeServico" ("tipoDeServico", "created_at", "updated_at") 
      // VALUES (${tipoDeServico}, ${dataAtual}, NULL)
      // RETURNING *;`;

      const createServiceType = tipoDeServico.create({
        tipoDeServico: tipoDeServico,
        app: app
      })

      response.success = createServiceType.length > 0;

      if (response.success) {
        response.success = true;
        response.found = createServiceType.length;
        response.data = constants["201"].serviceCreatedSuccessfully;
        return res.status(201).json(response);
      } else {
        response.error = constants["404"].noServiceFound;
      }
    } catch (error) {
      console.error("ERROR:", error);
      response.error = "Ocorreu um erro ao processar a solicitação.";
      return res.status(500).json(response);
    }

    return res.json(response);
  },

  async atualizaTipoDeServico(req: Request, res: Response) {
    const serviceId = req.params.id;
    const { tipoDeServico } = req.body;

    const atualizaServico = {
      tipoDeServico: tipoDeServico,
    };

    try {
      const servico = await ServiceType.findByPk(serviceId);

      if (servico) {
        await servico.update(atualizaServico);
        response.success = true;
        // response.found = servico.length;
        response.data = constants["201"].serviceUpdateSuccess;
      } else {
        response.error = constants["404"].noServiceFound;
        return res.status(404).json(response);
      }
    } catch (error) {
      console.error("ERROR:", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async deletarTipoDeServico(req: Request, res: Response) {
    const app = req.params.app;
    const serviceId = req.params.id;

    try {
      const deletaServico = await ServiceType.findByPk(serviceId);

      if (deletaServico) {
        response.success = true;
        // response.found = deletaServico.length;
        await deletaServico.destroy();
        response.data = constants["200"].serviceDeleted;
        return res.status(200).json(response);
      } else {
        response.error = constants["404"].noServiceFound;
      }
    } catch (error) {
      console.error("ERROR:", error);
      response.error = "Ocorreu um erro ao processar a solicitação.";
      return res.status(500).json(response);
    }
    return res.json(response);
  },
};
