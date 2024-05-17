import constants from "../constants/constants";
import { Request, Response } from "express";
import { responseModel } from "../helpers/responseModelHelper";
import { IResponse } from "../types/appsTypes";
import { appsListRepository } from "../repositories/appsRepository";

const response: IResponse = { ...responseModel };

export default {
  async appsList(req: Request, res: Response) {
    response.data = [];

    try {
      let listApps = await appsListRepository();
      if (listApps.length > 0) {
        response.success = true;
        response.found = listApps.length;
        response.data = listApps;
      } else {
        response.error = constants["404"].noAppsFound;
        return res.status(404).json(response);
      }
    } catch (error) {
      console.error("ERROR", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }

    return res.json(response);
  },
};
