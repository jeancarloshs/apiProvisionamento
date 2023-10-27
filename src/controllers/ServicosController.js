import { response } from "express";
import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";

const responseModel = {
  success: false,
  found: 0,
  data: [],
  error: "",
};

export default {
  async listaTipoDeServico(req, res) {
    const response = { ...responseModel };
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // weekday: 'long',
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    response.data = [];

    try {
      const tbTipoDeServico = await db`SELECT * FROM "tbTipoDeServico"`;
      response.success = tbTipoDeServico.length > 0;

      const resTbTipoDeServicoFormatado = tbTipoDeServico.map((row) => {
        return {
          ...row,
          created_at: dataFormatada.format(row.data),
          update_at: dataFormatada.format(row.data)
        };
      });

      if (response.success) {
        response.success = true;
        response.found = resTbTipoDeServicoFormatado.length;
        response.data = resTbTipoDeServicoFormatado;
      } else {
        response.error = constants["404"].noServiceFound;
      }
    } catch (e) {
      console.error("ERROR:", e);
      response.error = "Ocorreu um erro ao processar a solicitação.";
      return res.status(500).json(response);
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
      RETURNING *;`

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

  async deletarTipoDeServico(req, res) {
    const response = { ...responseModel };
    const serviceId = req.params.id;
    let query = "";

    try {
      query = await db`
      DELETE FROM "tbTipoDeServico" WHERE "id"=${serviceId}
      RETURNING *;`
      
      response.success = query.length > 0;
      if (response.success) {
        response.data = query.length;
        response.found = query.length;
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
  }
};
