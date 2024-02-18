import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";
import Positions from "../models/cargosModel.js";

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

    try {
      const listaCargos = await Positions.findAll()

      response.success = listaCargos.length > 0;

      if (response.success) {
        response.success = true;
        response.data = listaCargos
      } else {
        response.data = constants['404'].noPositionsFound
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
