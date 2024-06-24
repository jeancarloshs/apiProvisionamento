import { Request, Response } from "express";
import constants from "../constants/constants";
import {ServiceType, ServicesToMap} from "../database/models/tipoDeServicoModel";
import { responseModel } from "../helpers/responseModelHelper";
import { IResponse } from "../types/servicesTypes";
import { createServiceTypeRepository, serviceTypeListRepository } from "../repositories/servicesRepository";

const response: IResponse = { ...responseModel };

export default {
  async serviceTypeList(req: Request, res: Response) {
    let app = req.params.app;
    response.data = [];

    try {
      let serviceType = await serviceTypeListRepository(parseInt(app));

      if (serviceType) {
        response.success = true;
        response.found = serviceType.length;
        response.data = serviceType;
      } else {
        response.error = constants["404"].noServiceFound;
      }
    } catch (e) {
      console.error("ERROR:", e);
    }
    return res.json(response);
  },

  async createServiceType(req: Request, res: Response) {
    const { tipoDeServico, app } = req.body;

    try {
      const createServiceType = await createServiceTypeRepository(tipoDeServico, app);

      if (createServiceType) {
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

  async updateServiceType(req: Request, res: Response) {
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

  async deleteServiceType(req: Request, res: Response) {
    const app = req.params.app;
    const serviceId = req.params.id;

    try {
      const deletaServico = await ServiceType.findByPk(serviceId);

      if (deletaServico) {
        response.success = true;
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
