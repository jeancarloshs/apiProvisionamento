import express from "express";
import UsersController from "../controllers/UsersController";
import verifyJWT from "../middleware/jwt"

const router = express.Router();

router
    .get("/listUsers/:app", verifyJWT, UsersController.listUsers)
    .get("/listUser/:app/:id", verifyJWT, UsersController.listUser)
    .post("/createUser", verifyJWT, UsersController.createUser)
    .post("/userUpdate/:id", verifyJWT, UsersController.userUpdate)
    .delete("/deletarUsuario/:id", verifyJWT, UsersController.deletarUsuario)

export default router;