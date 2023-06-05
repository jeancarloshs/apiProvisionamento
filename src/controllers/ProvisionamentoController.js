import { response } from "express";
import db from "../config/dbConfig.js";
import constants from "../constants/constants.js";

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

  async listaClientes(req, res) {
    const response = { ...responseModel };
    response.data = [];

    const tbClientesProvisionados = await db`SELECT * FROM "PROVISIONAMENTO"`;

    if (tbClientesProvisionados.length > 0) {
      response.success = true;
      response.data.push(tbClientesProvisionados);
      response.found = tbClientesProvisionados.length;
    }

    return res.json(response);
  },

  async listaUsuario(req, res) {
    const response = { ...responseModel };
    let userId = req.params.id;
    response.data = [];
    let query = "";

    query = await db`SELECT * FROM "tbUsuarios" WHERE ${userId}`;
    const [, resUserId] = query;

    if (query.length < 1) {
      response.error.push("usuario não encontrado");
    } else {
      try {
        const userIdRes = await db`SELECT * FROM "tbUsuarios" WHERE "id" = ${userId}`
        response.success = userIdRes.length > 1

        if(response.success) {
            response.success = true
            response.found = userIdRes.length
            response.data = userId;
        } else {
            response.error.push("usuario não encontrado");
        }
      } catch (err) {
        console.log('ERRO:', err)
      }
    }
  },
};
