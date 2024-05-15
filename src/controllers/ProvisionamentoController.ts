import { Op } from "sequelize";
import sequelize from "../config/dbConfig";
import db from "../config/dbConfig";
import { Request, Response } from "express";
import constants from "../constants/constants";
import json from "body-parser";
import { mapProvisioningToIProvisionamento, Provisioning } from "../models/provisionamentoModel"
import { responseModel } from "../helpers/responseModelHelper";
import { UsersModel } from "../models/usuariosModel";
import { ServiceType } from "../models/tipoDeServicoModel";
import { AppsModel } from "../models/appsModel";
import { IResponse } from "../types/provisionamentoTypes";

const response: IResponse = { ...responseModel };

export default {
  async listaClientes(req: Request, res: Response) {
    const app = req.params.app;
    response.data = [];

    try {
      const tbClientesProvisionadosModel = await Provisioning.findAll({
        where: {
          'app': app
        },
        include: [
          {
            model: UsersModel,
            attributes: ['nomeFuncionario'],

          },
          {
            model: ServiceType,
            attributes: ['tipoDeServico']
          },
          {
            model: AppsModel,
            attributes: ['nomeApp']
          }
        ],
        attributes: [
          'id',
          'nomeCliente',
          'enderecoCliente',
          'numeroDeSerie',
          'posicionamento',
          'patrimonioNaxos',
          'created_at',
          'updated_at'
        ],
        order: [["id", "ASC"]],
        replacements: { app: app },
      })

      const tbClientesProvisionados = mapProvisioningToIProvisionamento(tbClientesProvisionadosModel);

      response.success = tbClientesProvisionados.length > 0;

      if (response.success) {
        response.success = true;
        response.found = tbClientesProvisionados.length;
        response.data = tbClientesProvisionados;
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

    const resClienteModel = await Provisioning.findAll({
      where: {
        "app": app,
        clientes: {
          [Op.like]: `%${nomeCliente}%` // Correção aqui
        }
      }
    });

    const resCliente = mapProvisioningToIProvisionamento(resClienteModel);

    response.success = resCliente.length > 0;

    try {
      if (response.success) {
        response.success = true;
        response.found = resCliente.length;
        response.data = resCliente
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

    const resTecnicoRuaModel = await Provisioning.findAll({
      where: {
        "app": app,
        tecnicoRua: {
          [Op.like]: `%${tecnicoRua}%`
        }
      }
    });

    const resTecnicoRua = mapProvisioningToIProvisionamento(resTecnicoRuaModel);

    response.success = resTecnicoRua.length > 0;

    try {
      if (response.success) {
        response.success = true;
        response.found = resTecnicoRua.length;
        response.data = resTecnicoRua;
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

    const resTecnicoSupModel = await Provisioning.findAll({
      where: {
        "app": app,
        tecnicoSup: {
          [Op.like]: `%${tecnicoSup}%`
        }
      }
    });

    const resTecnicoSup = mapProvisioningToIProvisionamento(resTecnicoSupModel);

    response.success = resTecnicoSup.length > 0;

    try {
      if (response.success) {
        response.success = true;
        response.found = resTecnicoSup.length;
        response.data = resTecnicoSup;
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
      const resNumberSerialModel = await Provisioning.findAll({
        where: {
          "app": app,
          numberSerial: {
            [Op.like]: `%${numberSerial}%`
          }
        }
      })

      const resNumberSerial = mapProvisioningToIProvisionamento(resNumberSerialModel);

      response.success = resNumberSerial.length > 0;
      if (response.success) {
        // response.success = resNumberSerial.length;
        response.found = resNumberSerial.length;
        response.data = resNumberSerial;
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
      const resNumeroPatrimonioNXModel = await Provisioning.findAll({
        where: {
          "app": app,
          patrimonioNX: patrimonioNX
        }
      })

      const resNumeroPatrimonioNX = mapProvisioningToIProvisionamento(resNumeroPatrimonioNXModel);

      response.success = resNumeroPatrimonioNX.length > 0;
      if (response.success) {
        // response.success = resNumeroPatrimonioNX.length;
        response.found = resNumeroPatrimonioNX.length;
        response.data = resNumeroPatrimonioNX;
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

    const resTipoDeAtivacaoModel = await Provisioning.findAll({
      where: {
        "app": app,
        tipoDeAtivacao: tipoDeAtivacao
      }
    })

    const resTipoDeAtivacao = mapProvisioningToIProvisionamento(resTipoDeAtivacaoModel);

    response.success = resTipoDeAtivacao.length > 0;

    try {
      if (response.success) {
        response.success = true;
        response.found = resTipoDeAtivacao.length;
        response.data = resTipoDeAtivacao;
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
      const provisionaCliente = await Provisioning.create({
        nomeCliente: nomeCliente,
        enderecoCliente: enderecoCliente,
        tecnicoRua: tecnicoRua,
        numeroDeSerie: numeroDeSerie,
        tipoDeServico: tipoDeServico,
        posicionamento: posicionamento,
        patrimonioNaxos: patrimonioNaxos,
        tecnicoSup: tecnicoSup,
        app: app
      })

      const provisionaClienteResponse = [provisionaCliente.dataValues];

      response.success = provisionaClienteResponse.length > 0;

      if (response.success) {
        response.success = true;
        // response.found = provisionaCliente.length;
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
      const removeCliente = await Provisioning.findByPk(clienteId)

      if (removeCliente) {
        response.success = true
        // response.found = removeCliente.length;
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
