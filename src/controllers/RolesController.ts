import { Request, Response } from "express";
import constants from "../constants/constants";
import { responseModel } from "../helpers/responseModelHelper";
import { IResponse } from "../types/rolesTypes";
import { rolesListRepository } from "../repositories/rolesRepository";

const response: IResponse = { ...responseModel };

export default {
  async listRole(req: Request, res: Response) {
    response.data = [];

    try {
      const listRoles = await rolesListRepository();

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
