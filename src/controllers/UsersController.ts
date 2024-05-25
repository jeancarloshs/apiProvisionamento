import { Request, Response } from "express";
import md5 from "md5";
import constants from "../constants/constants";
import { responseModel } from "../helpers/responseModelHelper";
import { dataFormatada } from "../helpers/dataFormatadaHelper";
import { IResponse } from "../types/usersTypes";
import { createUserRepository, listUserRepository, listUsersRepository } from "../repositories/userRepository";
import { UsersModel, UsersToMap } from "../models/usersModel";

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

  async createUser(req: Request, res: Response) {
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

    try {
      // const emailExists = await db`SELECT COUNT(*) as count FROM "tbUsuarios" WHERE "emailFuncionario" = ${emailFuncionario}`;
      const emailExists: any = await UsersModel.count({
        where: {
          emailFuncionario: emailFuncionario
        }
      })

      if (emailExists[0].count > 0) {
        // Email already exists, return an error response
        response.error = constants["409"].userAlreadyExist;
        return res.status(409).json(response);
      } else {
        const createUser = await createUserRepository(
          nomeFuncionario,
          cargoFuncionario,
          emailFuncionario,
          senhaFuncionario,
          admin,
          permissaoDoColaborador,
          status
        );

        response.success = createUser.length > 0;

        if (response.success) {
          response.success = true;
          response.found = createUser.length;
          response.data = constants["201"].userSuccess;
          response.data = createUser;
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

  async userUpdate(req: Request, res: Response) {
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

    const userUpdateOBJ = {
      nomeFuncionario: nomeFuncionario,
      cargoFuncionario: cargoFuncionario,
      emailFuncionario: emailFuncionario,
      senhaFuncionario: senhaFuncionario,
      admin: admin,
      permissaoDoColaborador: permissaoDoColaborador,
      status: status,
    };

    try {
      const userUpdate = await UsersModel.findByPk(userId);
      const userToMap = UsersToMap([userUpdate]);

      if (userUpdate) {
        await userUpdate.update(userUpdateOBJ);
        response.success = true;
        response.found = userToMap.length;
        response.data = constants["201"].userUpdateSuccess;
        response.data = "";
        return res.status(201).json(response);
      } else {
        response.error = constants["404"].userNotFound;
      }
    } catch (error) {
      console.error("ERRO:", error);
      if (
        error.message.includes(
          'duplicate key value violates unique constraint "tbUsuarios_emailFuncionario_key"'
        )
      ) {
        console.error("ERRO de chave duplicada");
        response.error = constants["409"].emailAlreadyExiste;
        return res.status(409).json(response);
      } else {
        response.error = constants["500"].errorOccurred;
        return res.status(500).json(response);
      }
    }

    return res.json(response);
  },

  async deletarUsuario(req: Request, res: Response) {
    response.data = [];
    const userId = req.params.id;

    try {
      const deleteUser = await UsersModel.findByPk(userId);
      const userToMap = UsersToMap([deleteUser]);

      response.success = userToMap.length > 0;
      if (response.success) {
        response.found = userToMap.length;
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
