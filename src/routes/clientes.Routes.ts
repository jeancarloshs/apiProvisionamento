import express from "express";
import ProvisioningController from "../controllers/ProvisioningController";
import verifyJWT from "../middleware/jwt";

const router = express.Router();

router
    .get("/customersList/:app", verifyJWT, ProvisioningController.customersList)
    .get("/customerSearch/:app", verifyJWT, ProvisioningController.customerSearch)
    .get("/searchTechnicalService/:app", verifyJWT, ProvisioningController.searchTechnicalService)
    .get("/searchServiceSupport/:app", verifyJWT, ProvisioningController.searchServiceSupport)
    .get("/serialNumbersearch/:app/:id", verifyJWT, ProvisioningController.serialNumbersearch)
    .get("/heritageSearch/:app/:id", verifyJWT, ProvisioningController.heritageSearch) //HERITAGE = PATRIMONIO
    .get("/searchTypeOfService/:app", verifyJWT, ProvisioningController.searchTypeOfService)
    .post("/provisionsCustomers", verifyJWT, ProvisioningController.provisionsCustomers)
    .delete("/removeClient/:app/:id", verifyJWT, ProvisioningController.removeClient)

export default router;