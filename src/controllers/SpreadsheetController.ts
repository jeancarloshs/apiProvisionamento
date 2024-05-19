import constants from "../constants/constants";
import { Request, Response } from "express";
import { IResponse } from "../types/spreadsheetTypes";
import { responseModel } from "../helpers/responseModelHelper";
import { createSpreadSheetRepository, listSpreadSheetRepository, listSpreadSheetsRepository } from "../repositories/spreadSheetsRepository";
import { SpreadSheetsModel } from "../models/spreadSheetsModel";

const response: IResponse = { ...responseModel };
response.data = []

export default {
	async listSpreadSheets(req: Request, res: Response) {
		let app = req.params.app

		try {
			let listSpreadSheets = await listSpreadSheetsRepository(parseInt(app));

			if (listSpreadSheets.length != 0) {
				response.success = true;
				response.data = listSpreadSheets;
				response.found = listSpreadSheets.length;
			} else {
				response.error = constants["404"].noSpreadSheetFound;
				return res.status(404).json(response);
			}
		} catch (error) {
			console.error("error", error);
			response.error = constants["500"].errorOccurred;
			return res.status(500).json(response);
		}

		return res.json(response);
	},

	async listSpreadSheet(req: Request, res: Response) {
		let app = req.params.app;
		let id = req.params.id;

		try {
			let listSpreadsheet = await listSpreadSheetRepository(parseInt(app), parseInt(id));

			if (listSpreadsheet.length != 0) {
				response.success = true;
				response.data = listSpreadsheet;
				response.found = listSpreadsheet.length
			} else {
				response.error = constants["404"].noSpreadSheetFound;
				return res.status(404).json(response);
			}
		} catch (error) {
			console.error("error", error);
			response.error = constants["500"].errorOccurred;
			return res.status(500).json(response);
		}

		return res.json(response);
	},

	async createSpreadSheet(req: Request, res: Response) {
		const { nomePlanilha, urlPlanilha, planilhaSelecionada, app } = req.body;

		try {
			let createSpreadSheet = await createSpreadSheetRepository(nomePlanilha, urlPlanilha, planilhaSelecionada, app);

			if (createSpreadSheet) {
				console.log("Planilha inserido com sucesso:", createSpreadSheet.toJSON())
				response.success = true;
				response.data = constants["201"].spreadSheetsCreated
			} else {
				response.error = constants["404"].noSpreadSheetFound
				return res.status(404).json(response)
			}
		} catch (error) {
			console.error("error", error);
			response.error = constants["500"].errorOccurred;
			return res.status(500).json(response);
		}
	},

	async updateSpreadSheet(req: Request, res: Response) {
		let spreadID = req.params.spreadID
		let { nomePlanilha, urlPlanilha, planilhaSelecionada, app } = req.body;

		const updateSpread = {
			nomePlanilha: nomePlanilha,
			urlPlanilha: urlPlanilha,
			planilhaSelecionada: planilhaSelecionada,
			app: app
		}

		try {
			const spreadsheet = await SpreadSheetsModel.findByPk(spreadID);

			if (spreadsheet) {
				await SpreadSheetsModel.update(updateSpread, {
					where: {
						"app": app
					}
				});
				response.success = true;
				response.data = constants["201"].spreadSheetsUpdate;
			} else {
				response.error = constants["404"].noSpreadSheetFound;
				return res.status(404).json(response);
			}
		} catch (error) {
			console.error("error", error);
			response.error = constants["500"].errorOccurred;
			return res.status(500).json(response);
		}
	},
}