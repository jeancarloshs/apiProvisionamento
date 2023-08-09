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

    const tbArquivos = await db`SELECT * FROM "tbArquivos"`;

    try {
      if (tbArquivos.length > 0) {
        response.success = true;
        response.found = tbArquivos.length;
        response.data.push(tbArquivos);
      } else {
        response.error = constants[404].noFilesFound;
      }
    } catch (error) {
      console.log("ERROR", error);
    }
    return res.json(response);
  },
};