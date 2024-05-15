import db from "../config/dbConfig";
import { Request, Response } from "express";
import constants from "../constants/constants";
import { Positions, mapCargosToICargos } from "../models/cargosModel";
import { responseModel } from "../helpers/responseModelHelper";
import { ICargos, IResponse } from "../types/cargosTypes";

const response: IResponse = { ...responseModel };

export default {
  async listaCargo(req: Request, res: Response) {
    response.data = [];

    try {
      const listaCargosModel = await Positions.findAll({
        order: [
          ["id", "ASC"],
        ]
      });

      const listaCargos: ICargos[] = mapCargosToICargos(listaCargosModel);

      if (listaCargos.length > 0) {
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
