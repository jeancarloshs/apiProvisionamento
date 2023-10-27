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
    response.data = [];

    try {
      const tbTipoDeServico = await db`SELECT * FROM "tbTipoDeServico"`;
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
      response.error = "Ocorreu um erro ao processar a solicitação.";
      return res.status(500).json(response);
    }
    return res.json(response);
  },
};
