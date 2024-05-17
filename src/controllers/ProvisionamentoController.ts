import {
  clientsListRepository,
  deleteClientRepository,
  findClientRepository,
  findClientTecExtRepository,
  findClientTecIntRepository,
  findTypeServiceRepository,
  findWithPatrimonyRepository,
  findWithSerialNumberRepository,
  provisioningClientRepository
} from "../repositories/provisioningRepository";
import { Request, Response } from "express";
import constants from "../constants/constants";
import { responseModel } from "../helpers/responseModelHelper";
import { IResponse } from "../types/provisionamentoTypes";

const response: IResponse = { ...responseModel };

export default {
  async listaClientes(req: Request, res: Response) {
    const app = req.params.app;
    response.data = [];

    try {
      let listClients = await clientsListRepository(parseInt(app));

      if (listClients.length > 0) {
        response.success = true;
        response.found = listClients.length;
        response.data = listClients;
      } else {
        response.data = constants['404'].noCustomersFound
      }

    } catch (error) {
      console.error("ERRO:", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }

    return res.json(response);
  },

  async buscaCliente(req: Request, res: Response) {
    const app = req.params.app;
    const { nomeCliente } = req.body;
    response.data = [];

    try {
      let foundClient = await findClientRepository(parseInt(app), nomeCliente);
      if (foundClient) {
        response.success = true;
        response.found = foundClient.length;
        response.data = foundClient
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (e) {
      console.error("ERRO:", e);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async buscaServicoTecnico(req: Request, res: Response) {
    const app = req.params.app;
    const { tecnicoRua } = req.body;
    response.data = [];

    try {
      let foundClientTecExt = await findClientTecExtRepository(parseInt(app), tecnicoRua);
      if (foundClientTecExt) {
        response.success = true;
        response.found = foundClientTecExt.length;
        response.data = foundClientTecExt;
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (e) {
      console.error("ERRO:", e);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async buscaServicoSuporte(req: Request, res: Response) {
    const { tecnicoSup, app } = req.body;
    response.data = [];

    try {
      let foundClientTecInt = await findClientTecIntRepository(parseInt(app), tecnicoSup);

      if (foundClientTecInt) {
        response.success = true;
        response.found = foundClientTecInt.length;
        response.data = foundClientTecInt;
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (e) {
      console.error("ERRO:", e);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async buscaSerialNumber(req: Request, res: Response) {
    const app = req.params.app;
    let numberSerial = req.params.id;
    response.data = [];

    try {
      let foundWithSerialNumber = await findWithSerialNumberRepository(parseInt(app), numberSerial);

      if (foundWithSerialNumber) {
        response.found = foundWithSerialNumber.length;
        response.data = foundWithSerialNumber;
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (e) {
      console.error("ERRO:", e);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async buscaPatrimonio(req: Request, res: Response) {
    const app = req.params.app;
    let patrimonioNX = req.params.id;
    response.data = [];

    try {
      let foundWithPatrimony = await findWithPatrimonyRepository(parseInt(app), patrimonioNX);

      if (foundWithPatrimony) {
        response.found = foundWithPatrimony.length;
        response.data = foundWithPatrimony;
      } else {
        response.error = constants["404"].heritageNotFound;
        return res.status(404).json(response);
      }
    } catch (e) {
      console.error("ERRO:", e);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async buscaTipoDeServico(req: Request, res: Response) {
    const app = req.params.app;
    const { tipoDeAtivacao } = req.body;
    response.data = [];

    try {
      let foundTypeService = await findTypeServiceRepository(parseInt(app), tipoDeAtivacao);
      if (foundTypeService) {
        response.success = true;
        response.found = foundTypeService.length;
        response.data = foundTypeService;
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (e) {
      console.error("ERRO:", e);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async provisionaClientes(req: Request, res: Response) {
    response.data = [];
    const {
      nomeCliente,
      enderecoCliente,
      tecnicoRua,
      numeroDeSerie,
      posicionamento,
      patrimonioNaxos,
      tecnicoSup,
      tipoDeServico,
      app,
    } = req.body;

    try {
      let provisionedClient = await provisioningClientRepository(
        nomeCliente,
        enderecoCliente,
        tecnicoRua,
        numeroDeSerie,
        posicionamento,
        patrimonioNaxos,
        tecnicoSup,
        tipoDeServico,
        app
      );

      if (provisionedClient) {
        response.success = true;
        response.data = constants["201"].successfullyProvisioned;
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (e) {
      console.error("ERRO:", e);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async removeCliente(req: Request, res: Response) {
    let app = req.params.app;
    let clienteId = req.params.id;
    response.data = [];

    try {
      const removeCliente = await deleteClientRepository(parseInt(clienteId));

      if (removeCliente) {
        response.success = true
        await removeCliente.destroy();
        response.data = constants["200"].deletedClient;
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (e) {
      console.error("ERRO:", e);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },
};
