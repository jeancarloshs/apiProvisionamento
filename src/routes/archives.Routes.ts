import express from "express";
import ArchivesController from "../controllers/ArchivesController";
import verifyJWT from "../middleware/jwt";

const router = express.Router();

router
    .get("/listFiles/:app", verifyJWT, ArchivesController.listFiles)
    .post("/insertFile", verifyJWT, ArchivesController.insertFile)
    .post("/updateFile/:id", verifyJWT, ArchivesController.updateFile)
    .delete("/deleteFile/:app/:id", verifyJWT, ArchivesController.deleteFile)

export default router;