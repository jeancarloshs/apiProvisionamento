import constants from "../constants/constants";
import { Request, Response } from "express";
import { IResponse } from "../types/spreadsheetTypes";
import { responseModel } from "../helpers/responseModelHelper";

const response: IResponse = { ...responseModel };

export default {
    async listSpreadsheet(req: Request, res: Response) {
        let app = req.params.app
        response.data = []
    }
}