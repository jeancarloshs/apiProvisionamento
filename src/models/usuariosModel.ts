import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";
import { IUsers } from "../types/usersTypes";

const UsersModel = sequelize.define("tbUsuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeFuncionario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cargoFuncionario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailFuncionario: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  senhaFuncionario: {
    type: DataTypes.STRING,
    allowNull: true
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  permissaoDoColaborador: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  app: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true
  }
});

export { UsersModel };

export function UsersToMap(UsersModel: any[]): IUsers[] {
  return UsersModel.map(model => ({
    id: model.id,
    nomeFuncionario: model.nomeFuncionario,
    cargoFuncionario: model.cargoFuncionario,
    emailFuncionario: model.emailFuncionario,
    senhaFuncionario: model.senhaFuncionario,
    admin: model.admin,
    permissaoDoColaborador: model.permissaoDoColaborador,
    status: model.status,
    app: model.app,
    created_at: model.created_at,
    updated_at: model.updated_at,
  }))
}