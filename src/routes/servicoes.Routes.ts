import express from "express";
import ServicesController from "../controllers/ServicesController";
import verifyJWT from "../middleware/jwt";

const router = express.Router();

router
    .get("/serviceTypeList/:app", verifyJWT, ServicesController.serviceTypeList)
    .post("/createServiceType", verifyJWT, ServicesController.createServiceType)
    .post("/updateServiceType/:id", verifyJWT, ServicesController.updateServiceType)
    .delete("/deleteServiceType/:app/:id", verifyJWT, ServicesController.deleteServiceType)

export default router