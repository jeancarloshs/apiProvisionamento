import { UsersModel, UsersToMap } from "../database/models/usersModel";

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

export const createUserRepository = async (
	nomeFuncionario: string,
	cargoFuncionario: string,
	emailFuncionario: string,
	passwordEncrypted: string,
	admin: boolean,
	permissaoDoColaborador: string,
	status: number,
) => {
	const date = new Date();
	const createUserRepository = await UsersModel.create({
		nomeFuncionario: nomeFuncionario,
		cargoFuncionario: cargoFuncionario,
		emailFuncionario: emailFuncionario,
		senhaFuncionario: passwordEncrypted,
		admin: admin,
		permissaoDoColaborador: permissaoDoColaborador,
		status: status,
		created_at: date
	})

	const usersToMap = UsersToMap([createUserRepository]);
	return usersToMap;
}