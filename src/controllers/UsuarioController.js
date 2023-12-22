// import { json } from "body-parser";
import db from "../config/dbConfig.js";
import md5 from "md5";
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
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
    
    try {
      const tbUsuarios = await db`
        SELECT id, "nomeFuncionario", "cargoFuncionario", "emailFuncionario", "admin", "permissaoDoColaborador", "created_at", "update_at", "status"
        FROM "tbUsuarios"
        ORDER BY status DESC, id ASC
      `;
      if (tbUsuarios.length > 0) {
  
        // Formatar a data para cada registro retornado
        const tbUsuariosFormatado = tbUsuarios.map((row) => {
          return {
            ...row,
            created_at: dataFormatada.format(row.created_at),
            update_at: dataFormatada.format(row.update_at),
          };
        });
  
        response.success = true;
        response.data = tbUsuariosFormatado;
        response.found = tbUsuariosFormatado.length;
      } else {
        response.success = false;
        response.data = [];
        response.found = 0;
      }
    } catch (err) {
      console.error("error", err);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
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
        await db`SELECT id, "nomeFuncionario", "cargoFuncionario", "emailFuncionario", "admin", "created_at" FROM "tbUsuarios" WHERE "id" = ${userId}`;
      response.success = userIdRes.length > 0;

        // Formatar a data para cada registro retornado
        const userIdResFormatado = userIdRes.map((row) => {
          return {
            ...row,
            created_at: dataFormatada.format(row.created_at),
            update_at: dataFormatada.format(row.update_at),
          };
        });

      if (response.success) {
        response.success = true;
        response.found = userIdResFormatado.length;
        response.data = userIdResFormatado;
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (err) {
      console.error("ERRO:", err);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }

    return res.json(response);
  },

  async inserirUsuario(req, res) {
    const response = { ...responseModel };
    const dataAtual = new Date();
    const {
      nomeFuncionario,
      cargoFuncionario,
      emailFuncionario,
      senhaFuncionario,
      admin,
      permissaoDoColaborador,
      status,
    } = req.body;
    const passwordEncrypted = md5(senhaFuncionario);
    let query = "";

    try {
      const emailExists =
        await db`SELECT COUNT(*) as count FROM "tbUsuarios" WHERE "emailFuncionario" = ${emailFuncionario}`;

      if (emailExists[0].count > 0) {
        // Email already exists, return an error response
        response.error = constants["409"].userAlreadyExist;
        return res.status(409).json(response);
      } else {
        query = await db`
        INSERT INTO "tbUsuarios" ("nomeFuncionario", "cargoFuncionario", "emailFuncionario", "senhaFuncionario", "created_at", "admin", "permissaoDoColaborador", "update_at", "status") 
        VALUES (${nomeFuncionario}, ${cargoFuncionario}, ${emailFuncionario}, ${passwordEncrypted}, ${dataAtual}, ${typeof admin === "boolean" ? admin : null }, ${permissaoDoColaborador}, NULL, ${parseInt(status)})
        RETURNING *;`;

        response.success = query.length > 0;

        if (response.success) {
          response.success = true;
          response.found = query.length;
          response.data = constants["201"].userSuccess;
          response.data = {
            nomeFuncionario,
            cargoFuncionario,
            emailFuncionario,
            admin,
            permissaoDoColaborador,
            status
          };
          return res.status(201).json(response);
        } else {
          response.error = constants["404"].userNotFound;
          // return res.status(404).json(response);
        }
      }
    } catch (error) {
      console.error("ERRO:", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }

    return res.json(response);
  },

  async atualizarUsuario(req, res) {
    const response = { ...responseModel };
    const dataAtual = new Date();
    const userId = req.params.id;
    const {
      nomeFuncionario,
      cargoFuncionario,
      emailFuncionario,
      senhaFuncionario,
      admin,
      permissaoDoColaborador,
      status,
    } = req.body;
    const passwordEncrypted = md5(senhaFuncionario);
    let query = "";

    try {
      query = await db`
      UPDATE "tbUsuarios" 
      SET "nomeFuncionario"=${nomeFuncionario}, "cargoFuncionario"=${cargoFuncionario}, "emailFuncionario"=${emailFuncionario}, "senhaFuncionario"=${passwordEncrypted}, "admin"=${admin}, "permissaoDoColaborador"=${permissaoDoColaborador}, "update_at"=${dataAtual}, "status"=${status}
      WHERE "id"=${userId}
      RETURNING *;`

      response.success = query.length > 0;

      if (response.success) {
        response.success = true;
        response.found = query.length;
        response.data = constants["201"].userUpdateSuccess;
        response.data = {
          nomeFuncionario,
          cargoFuncionario,
          emailFuncionario,
          admin,
          permissaoDoColaborador,
          status
        };
        return res.status(201).json(response);
      } else {
        response.error = constants["404"].userNotFound;
      }
      
    } catch (error) {
      console.error("ERRO:", error);
      if (error.message.includes('duplicate key value violates unique constraint "tbUsuarios_emailFuncionario_key"')) {
        console.error('ERRO de chave duplicada');
        response.error = constants['409'].emailAlreadyExiste;
        return res.status(409).json(response);
      } else {
        response.error = constants["500"].errorOccurred;
        return res.status(500).json(response);
      }
    }

    return res.json(response);
  },

  async deletarUsuario(req, res) {
    const response = { ...responseModel };
    response.data = [];
    const userId = req.params.id;
    let query = "";

    try {
      query = await db`
      DELETE FROM "tbUsuarios" WHERE "id"=${userId}
      RETURNING *;`;

      response.success = query.length > 0;
      if (response.success) {
        response.data = query.length;
        response.found = query.length;
        response.data = constants["200"].deletedUser;
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (error) {
      console.error("ERROR:", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },
};
