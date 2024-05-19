import express from "express";
import SpreadsheetController from "../controllers/SpreadsheetController";
import verifyJWT from "../middleware/jwt";

const router = express.Router();

router
    .get("/listSpreadSheets/:app", verifyJWT, SpreadsheetController.listSpreadSheets)
    .get("/listSpreadSheet/:app/:id", verifyJWT, SpreadsheetController.listSpreadSheet)
    
    .post("/createSpreadSheet", verifyJWT, SpreadsheetController.createSpreadSheet)
    .post("/updateSpreadSheet/:id", verifyJWT, SpreadsheetController.updateSpreadSheet)

export default router;