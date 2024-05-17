import { Request, Response } from "express";
import constants from "../constants/constants";
import { UsersModel, UsersToMap } from "../models/usuariosModel";
import { responseModel } from "../helpers/responseModelHelper";
import { dataFormatada } from "../helpers/dataFormatadaHelper";
import { IResponse } from "../types/usersTypes";
import { listUserRepository, listUsersRepository } from "../repositories/userRepository";

const response: IResponse = { ...responseModel };

export default {
  async listUsers(req: Request, res: Response) {
    let app = req.params.app;
    try {
      let usersList = await listUsersRepository(parseInt(app));

      if (usersList.length > 0) {
        response.success = true;
        response.data = usersList;
        response.found = usersList.length;
      } else {
        response.error = constants["404"].usersNotFound;
        return res.status(404).json(response);
      }
    } catch (err) {
      console.error("error", err);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  async listUser(req: Request, res: Response) {
    let app = req.params.app;
    let userId = req.params.id;
    response.data = [];

    try {
      let listUserByID = await listUserRepository(parseInt(userId), parseInt(app));

      // Formatar a data para cada registro retornado
      const userIdResFormatado = listUserByID.map((row) => {
        return {
          ...row,
          created_at: dataFormatada.format(row.created_at),
          updated_at: dataFormatada.format(row.updated_at),
        };
      });

      if (listUserByID) {
        response.success = true;
        response.found = userIdResFormatado.length;
        response.data = userIdResFormatado;
      } else {
        response.error = constants["404"].userNotFound;
        return res.status(404).json(response);
      }
    } catch (error) {
      console.error("ERRO:", error);
      response.error = constants["500"].errorOccurred;
      return res.status(500).json(response);
    }
    return res.json(response);
  },

  // async inserirUsuario(req: Request, res: Response) {
  //   const dataAtual = new Date();
  //   const {
  //     nomeFuncionario,
  //     cargoFuncionario,
  //     emailFuncionario,
  //     senhaFuncionario,
  //     admin,
  //     permissaoDoColaborador,
  //     status,
  //   } = req.body;
  //   const passwordEncrypted = md5(senhaFuncionario);
  //   let query = "";

  //   try {
  //     const emailExists =
  //       await db`SELECT COUNT(*) as count FROM "tbUsuarios" WHERE "emailFuncionario" = ${emailFuncionario}`;

  //     if (emailExists[0].count > 0) {
  //       // Email already exists, return an error response
  //       response.error = constants["409"].userAlreadyExist;
  //       return res.status(409).json(response);
  //     } else {
  //       query = await db`
  //       INSERT INTO "tbUsuarios" ("nomeFuncionario", "cargoFuncionario", "emailFuncionario", "senhaFuncionario", "created_at", "admin", "permissaoDoColaborador", "updated_at", "status") 
  //       VALUES (${nomeFuncionario}, ${cargoFuncionario}, ${emailFuncionario}, ${passwordEncrypted}, ${dataAtual}, ${typeof admin === "boolean" ? admin : null
  //         }, ${permissaoDoColaborador}, NULL, ${parseInt(status)})
  //       RETURNING *;`;

  //       response.success = query.length > 0;

  //       if (response.success) {
  //         response.success = true;
  //         response.found = query.length;
  //         response.data = constants["201"].userSuccess;
  //         response.data = {
  //           nomeFuncionario,
  //           cargoFuncionario,
  //           emailFuncionario,
  //           admin,
  //           permissaoDoColaborador,
  //           status,
  //         };
  //         return res.status(201).json(response);
  //       } else {
  //         response.error = constants["404"].userNotFound;
  //         // return res.status(404).json(response);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("ERRO:", error);
  //     response.error = constants["500"].errorOccurred;
  //     return res.status(500).json(response);
  //   }

  //   return res.json(response);
  // },

  // async atualizarUsuario(req: Request, res: Response) {
  //   const dataAtual = new Date();
  //   const userId = req.params.id;
  //   const {
  //     nomeFuncionario,
  //     cargoFuncionario,
  //     emailFuncionario,
  //     senhaFuncionario,
  //     admin,
  //     permissaoDoColaborador,
  //     status,
  //   } = req.body;
  //   const passwordEncrypted = md5(senhaFuncionario);
  //   let query = "";

  //   try {
  //     query = await db`
  //     UPDATE "tbUsuarios" 
  //     SET "nomeFuncionario"=${nomeFuncionario}, "cargoFuncionario"=${cargoFuncionario}, "emailFuncionario"=${emailFuncionario}, "senhaFuncionario"=${passwordEncrypted}, "admin"=${admin}, "permissaoDoColaborador"=${permissaoDoColaborador}, "updated_at"=${dataAtual}, "status"=${status}
  //     WHERE "id"=${userId}
  //     RETURNING *;`;

  //     response.success = query.length > 0;

  //     if (response.success) {
  //       response.success = true;
  //       response.found = query.length;
  //       response.data = constants["201"].userUpdateSuccess;
  //       response.data = {
  //         nomeFuncionario,
  //         cargoFuncionario,
  //         emailFuncionario,
  //         admin,
  //         permissaoDoColaborador,
  //         status,
  //       };
  //       return res.status(201).json(response);
  //     } else {
  //       response.error = constants["404"].userNotFound;
  //     }
  //   } catch (error) {
  //     console.error("ERRO:", error);
  //     if (
  //       error.message.includes(
  //         'duplicate key value violates unique constraint "tbUsuarios_emailFuncionario_key"'
  //       )
  //     ) {
  //       console.error("ERRO de chave duplicada");
  //       response.error = constants["409"].emailAlreadyExiste;
  //       return res.status(409).json(response);
  //     } else {
  //       response.error = constants["500"].errorOccurred;
  //       return res.status(500).json(response);
  //     }
  //   }

  //   return res.json(response);
  // },

  // async deletarUsuario(req: Request, res: Response) {
  //   response.data = [];
  //   const userId = req.params.id;
  //   let query = "";

  //   try {
  //     query = await db`
  //     DELETE FROM "tbUsuarios" WHERE "id"=${userId}
  //     RETURNING *;`;

  //     response.success = query.length > 0;
  //     if (response.success) {
  //       response.data = query.length;
  //       response.found = query.length;
  //       response.data = constants["200"].deletedUser;
  //     } else {
  //       response.error = constants["404"].userNotFound;
  //       return res.status(404).json(response);
  //     }
  //   } catch (error) {
  //     console.error("ERROR:", error);
  //     response.error = constants["500"].errorOccurred;
  //     return res.status(500).json(response);
  //   }
  //   return res.json(response);
  // },
};
