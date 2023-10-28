import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";

const responseModel = {
  success: false,
  found: 0,
  data: [],
  error: "",
};

export default {
  async listaArquivos(req, res) {
    const response = { ...responseModel };
    response.data = [];
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

    const tbArquivos = await db`SELECT * FROM "tbArquivos"`;

    try {

      const resListaArquivosFormatado = tbArquivos.map((row) => {
        return {
          ...row,
          created_at: dataFormatada.format(row.data),
          update_at: dataFormatada.format(row.data)
        };
      });

      if (tbArquivos.length > 0) {
        response.success = true;
        response.found = resListaArquivosFormatado.length;
        response.data.push(resListaArquivosFormatado);
      } else {
        response.error = constants[404].noFilesFound;
      }
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async inserirArquivo(req, res) {
    const response = { ...responseModel };
    const dataAtual = new Date();
    const { 
      nomeArquivo,
      urlArquivo
    } = req.body;
    let query = "";

    try {
      query = await db`
      INSERT INTO "tbArquivos" ("nome", "url", "created_at", "update_at") 
      VALUES (${nomeArquivo}, ${urlArquivo}, ${dataAtual}, NULL)
      RETURNING *;`;

      response.success = query.length > 0;

      if (response.success) {
        response.success = true;
        response.data = constants['201'].fileCreatedSuccessfully
      } else {
        response.data = constants['404'].noFilesFound
        return res.status(404).json(response)
      }

    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response)
  },

  async deletarArquivo(req, res) {
    const response = { ...responseModel };
    const arqId = req.params.id;
    let query = "";

    try {
      query = await db`
      DELETE FROM "tbArquivos" WHERE "id"=${arqId} 
      RETURNING *;`

      response.success = query.length > 0;
      if (response.success) {
        response.success = query.length > 0;
        response.data = query.length;
        response.found = query.length;
        response.data = constants["200"].deletedFile;
        return res.status(200).json(response);
      } else {
        response.error = constants["404"].noFilesFound;
      }
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }

    return res.json(response)
  }
};
