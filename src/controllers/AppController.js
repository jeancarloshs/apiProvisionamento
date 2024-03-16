import constants from '../constants/constants.js';
import AppsModel from '../models/appsModel.js';
import StatesModel from '../models/estadosModel.js';
import { responseModel } from '../helpers/responseModelHelper.js';

const response = { ...responseModel };

export default {
	async listaApps(req, res) {
		response.data = [];

		try {
			const tbApps = await AppsModel.findAll({
				raw: true,
				include: [{
					model: StatesModel,
					required: true,
					attributes: ["estadosCompleto", "estadosAbreviado"]
				}],
				order: [['id', 'ASC']],
			})

			console.log('result 2', tbApps)

			if (tbApps.length > 0) {
				response.success = true;
				response.found = tbApps.length;
				response.data = tbApps;
			} else {
				response.error = constants['404'].noAppsFound;
			}
		} catch (error) {
			console.error("ERROR", error);
			response.error = constants['500'].errorOccurred;
			return res.status(500).json(response);
		}


		return res.json(response);
	}
}