import { SpreadSheetsModel, SpreadSheetsToMap } from "../models/spreadSheetsModel";


export const listSpreadSheetsRepository = async (app: number) => {
    const listSpreadSheetsRepository = await SpreadSheetsModel.findAll({
        where: {
            "app": app
        },
        order: [
            ["id", "ASC"]
        ]
    });
    const listSpreadSheets = SpreadSheetsToMap(listSpreadSheetsRepository);
    return listSpreadSheets;
};

export const listSpreadSheetRepository = async (app: number, id: number) => {
    const listSpreadSheetRepository = await SpreadSheetsModel.findOne({
        where: {
            "id": id,
            "app": app
        }
    });
    const listSpreadSheets = SpreadSheetsToMap([listSpreadSheetRepository]);
    return listSpreadSheets;
};

export const createSpreadSheetRepository = async (nomePlanilha: string, urlPlanilha: string, planilhaSelecionada: boolean, app: string) => {
    let createSpreadSheetRepository = await SpreadSheetsModel.create({
        nomePlanilha: nomePlanilha,
        urlPlanilha: urlPlanilha,
        planilhaSelecionada: planilhaSelecionada,
        app: app
    });
    return createSpreadSheetRepository;
}