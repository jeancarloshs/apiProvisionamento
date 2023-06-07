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
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // weekday: 'long',
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    response.data = [];

    const tbUsuarios =
      await db`SELECT id, "nomeFuncionario", "cargoFuncionario", "emailFuncionario", "admin", "permissaoDoColaborador", "created_at", "update_at" FROM "tbUsuarios"`;
    // console.log(tbUsuarios)

    // Formatar a data para cada registro retornado
    const restbUsuariosFormatado = tbUsuarios.map((row) => {
      return {
        ...row,
        created_at: dataFormatada.format(row.data),
        update_at: dataFormatada.format(row.data),
      };
    });

    try {
      if (restbUsuariosFormatado.length > 0) {
        response.success = true;
        response.data.push(restbUsuariosFormatado);
        response.found = restbUsuariosFormatado.length;
      }
    } catch (err) {
      console.log("error", err);
    }

    return res.json(response);
  },

  async listaUsuario(req, res) {
    const response = { ...responseModel };
    let userId = req.params.id;
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // weekday: 'long',
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    response.data = [];

    try {
      const userIdRes =
        await db`SELECT id, "nomeFuncionario", "cargoFuncionario", "emailFuncionario", "created_at" FROM "tbUsuarios" WHERE "id" = ${userId}`;
      response.success = userIdRes.length > 0;

    // Formatar a data para cada registro retornado
    const resUserIdResFormatado = userIdRes.map((row) => {
      return {
        ...row,
        created_at: dataFormatada.format(row.data),
      };
    });

      // console.log("RES", userIdRes);

      if (response.success) {
        response.success = true;
        response.found = resUserIdResFormatado.length;
        response.data = resUserIdResFormatado;
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (err) {
      console.log("ERRO:", err);
    }

    return res.json(response);
  },
};
