import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";
import ServiceType from "../models/tipoDeServicoModel.js";

const responseModel = {
  success: false,
  found: 0,
  data: [],
  error: "",
};

export default {
  async listaTipoDeServico(req, res) {
    const response = { ...responseModel };
    response.data = [];

    try {
      const tbTipoDeServico = await ServiceType.findAll();
      // const tbTipoDeServico = await db`SELECT * FROM "tbTipoDeServico"`;
      response.success = tbTipoDeServico.length > 0;

      if (response.success) {
        response.success = true;
        response.found = tbTipoDeServico.length;
        response.data = tbTipoDeServico;
      } else {
        response.error = constants["404"].noServiceFound;
      }
    } catch (e) {
      console.error("ERROR:", e.message);
    }
    return res.json(response);
  },

  async criarTipoDeServico(req, res) {
    const response = { ...responseModel };
    const dataAtual = new Date();
    const { tipoDeServico } = req.body;
    let query = "";

    try {
      query = await db`
      INSERT INTO "tbTipoDeServico" ("tipoDeServico", "created_at", "update_at") 
      VALUES (${tipoDeServico}, ${dataAtual}, NULL)
      RETURNING *;`;

      response.success = query.length > 0;

      if (response.success) {
        response.success = true;
        response.found = query.length;
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

  async atualizaTipoDeServico(req, res) {
    const response = { ...responseModel };
    const dataAtual = new Date();
    const serviceId = req.params.id;
    const { tipoDeServico } = req.body;
    // let query = "";

    const atualizaServico = {
      tipoDeServico: tipoDeServico
    }

    try {
      const servico = await ServiceType.findByPk(serviceId);
      // query = await db`
      // UPDATE "tbTipoDeServico" SET "tipoDeServico"=${tipoDeServico}, "update_at"=${dataAtual} 
      // WHERE "id"=${serviceId}
      // RETURNING *;`;

      // response.success = query.length > 0;

      if (servico) {
        await servico.update(atualizaServico);
        response.success = true;
        response.found = servico.length;
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

  async deletarTipoDeServico(req, res) {
    const response = { ...responseModel };
    const serviceId = req.params.id;
    // let query = "";

    try {
      const deletaServico = await ServiceType.findByPk(serviceId);
      // query = await db`
      // DELETE FROM "tbTipoDeServico" WHERE "id"=${serviceId}
      // RETURNING *;`;

      // response.success = query.length > 0;
      if (deletaServico) {
        response.success = true;
        response.found = deletaServico.length;
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
