import { Op } from "sequelize";
import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";
import json from "body-parser";
import OldProv from "../models/oldProvModel.js"
import { responseModel } from "../helpers/responseModelHelper.js";

const response = { ...responseModel };

export default {
  async listaClientes(req, res) {
    response.data = [];

    try {
      const tbClientesProvisionados = await OldProv.findAll();

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

  async buscaCliente(req, res) {
    const { nomeCliente } = req.body;
    response.data = [];

    const resCliente = await OldProv.findAll({
      where: {
        clientes: {
          [Op.like]: `%${nomeCliente}%` // Correção aqui
        }
      }
    });

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

  async buscaServicoTecnico(req, res) {
    const { tecnicoRua } = req.body;
    response.data = [];

    const resTecnicoRua = await OldProv.findAll({
      where: {
        tecnicoRua: {
          [Op.like]: `%${tecnicoRua}%`
        }
      }
    });

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

  async buscaServicoSuporte(req, res) {
    const { tecnicoSup } = req.body;
    response.data = [];

    const resTecnicoSup = await OldProv.findAll({
      where: {
        tecnicoSup: {
          [Op.like]: `%${tecnicoSup}%`
        }
      }
    });

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

  async buscaSerialNumber(req, res) {
    let numberSerial = req.params.id;
    response.data = [];

    try {
      const resNumberSerial = await OldProv.findAll({
        where: {
          numberSerial: {
            [Op.like]: `%${numberSerial}%`
          }
        }
      })

      response.success = resNumberSerial.length > 0;
      if (response.success) {
        response.success = resNumberSerial.length;
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

  async buscaPatrimonio(req, res) {
    let patrimonioNX = req.params.id;
    response.data = [];

    try {
      const resNumeroPatrimonioNX = await OldProv.findAll({
        where: {
          patrimonioNX: patrimonioNX
        }
      })

      response.success = resNumeroPatrimonioNX.length > 0;
      if (response.success) {
        response.success = resNumeroPatrimonioNX.length;
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

  async buscaTipoDeServico(req, res) {
    const { tipoDeAtivacao } = req.body;
    response.data = [];

    const resTipoDeAtivacao = await OldProv.findAll({
      where: {
        tipoDeAtivacao: tipoDeAtivacao
      }
    })

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

  async provisionaClientes(req, res) {
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
    } = req.body;

    try {
      const provisionaCliente = await OldProv.create({
        clientes: nomeCliente,
        tecnicoRua: tecnicoRua,
        numberSerial: numeroDeSerie,
        tipoDeAtivacao: tipoDeServico,
        posicionamento: posicionamento,
        patrimonioNX: patrimonioNaxos,
        tecnicoSup: tecnicoSup
      })

      response.success = provisionaCliente.length > 0;

      if (response.success) {
        response.success = true;
        response.found = provisionaCliente.length;
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

  async removeCliente(req, res) {
    response.data = [];
    let clienteId = req.params.id;

    try {
      const removeCliente = await OldProv.findByPk(clienteId)

      if (removeCliente) {
        response.success = true
        response.found = removeCliente.length;
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
