import constants from "../constants/constants";
import { Request, Response } from "express";
import { AppsModel, mapAppsToIApps } from "../models/appsModel"
import StatesModel from "../models/estadosModel";
import { responseModel } from "../helpers/responseModelHelper";
import { IApps, IResponse, ITbEstado } from "../types/appsTypes";

const response: IResponse = { ...responseModel };

export default {
  async listaApps(req: Request, res: Response) {
    response.data = [];

    try {
      const tbAppsModels = await AppsModel.findAll({
        include: [
          {
            model: StatesModel,
            required: true,
            attributes: ["estadosCompleto", "estadosAbreviado"],
          },
        ],
        order: [["id", "ASC"]],
      });

      const tbApp: IApps[] = mapAppsToIApps(tbAppsModels);

      if (tbApp.length > 0) {
        response.success = true;
        response.found = tbApp.length;
        response.data = tbApp;
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
