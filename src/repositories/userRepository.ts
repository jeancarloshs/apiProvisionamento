import { UsersModel, UsersToMap } from "../models/usuariosModel";

export const listUsersRepository = async (app: number) => {
  const listUsersRepository = await UsersModel.findAll({
    where: {
      "app": app
    },
    order: [
      ["status", "DESC"],
      ["id", "ASC"],
    ],
  });

  const listUsers = UsersToMap(listUsersRepository);
  return listUsers;
}

export const listUserRepository = async (userId: number, app: number) => {
  const listUserRepository = await UsersModel.findOne({
    where: {
      id: userId,
      "app": app
    },
  });

  const listUserByID = [listUserRepository!.dataValues];
  return listUserByID;
}