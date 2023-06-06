import db from "../config/dbConfig.js";
import md5 from "md5";
import constants from "../constants/constants.js";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

const responseModel = {
  success: false,
  found: 0,
  data: [],
  error: "",
};

export default {
  async listaUsuarios(req, res) {
    const response = { ...responseModel };
    response.data = [];

    const tbUsuarios = await db`SELECT * FROM "tbUsuarios"`;
    // console.log(tbUsuarios)

    if (tbUsuarios.length > 0) {
      response.success = true;
      response.data.push(tbUsuarios);
      response.found = tbUsuarios.length;
    }

    return res.json(response);
  },

  async listaUsuario(req, res) {
    const response = { ...responseModel };
    let userId = req.params.id;
    response.data = [];

    try {
      const userIdRes =
        await db`SELECT id, "nomeFuncionario", "cargoFuncionario", "emailFuncionario", "created_at" FROM "tbUsuarios" WHERE "id" = ${userId}`;
      response.success = userIdRes.length > 0;

      console.log("RES", userIdRes);

      if (response.success) {
        response.success = true;
        response.found = userIdRes.length;
        response.data = userIdRes;
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (err) {
      console.log("ERRO:", err);
    }

    return res.json(response);
  },
};
