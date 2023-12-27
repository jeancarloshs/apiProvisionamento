import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";

const responseModel = {
  success: false,
  found: 0,
  data: [],
  error: "",
};

export default {
  async listaCargo(req, res) {
    const response = { ...responseModel };
    response.data = [];
    let query;

    try {
      query = await db`SELECT * FROM "tbTipoDeServico"`;

      response.success = query.length > 0;

      if (response.success) {
        response.success = true;
        response.data = query
      } else {
        response.data = constants['404'].noServiceFound
        return res.status(404).json(response)
      }
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response)
  },
};
