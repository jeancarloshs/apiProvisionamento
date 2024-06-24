import { AppsModel, mapAppsToIApps } from "../database/models/appsModel"
import StatesModel from "../database/models/estadosModel";
import { IApps, IResponse, ITbEstado } from "../types/appsTypes";

export const appsListRepository = async () => {
  const appsListRepository = await AppsModel.findAll({
    include: [
      {
        model: StatesModel,
        required: true,
        attributes: ["estadosCompleto", "estadosAbreviado"],
      },
    ],
    order: [["id", "ASC"]],
  });

  const appsList: IApps[] = mapAppsToIApps(appsListRepository);
  return appsList;
}