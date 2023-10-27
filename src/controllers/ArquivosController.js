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
      response.error = "Ocorreu um erro ao processar a solicitação.";
      return res.status(500).json(response);
    }
    return res.json(response);
  },
};
