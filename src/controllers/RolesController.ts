import db from "../config/dbConfig";
import { Request, Response } from "express";
import constants from "../constants/constants";
import { Roles, rolesToMap } from "../models/rolesModel";
import { responseModel } from "../helpers/responseModelHelper";
import { ICargos, IResponse } from "../types/cargosTypes";
import { rolesList } from "../repositories/rolesRepository";

const response: IResponse = { ...responseModel };

export default {
  async listaCargo(req: Request, res: Response) {
    response.data = [];

    try {
      const listRoles = await rolesList();

      if (listRoles.length > 0) {
        response.success = true;
        response.data = listRoles
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
