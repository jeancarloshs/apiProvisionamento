import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Users = sequelize.define("tbUsuarios", {
  id: {
    type: DataTypes.BIGINT,
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
  update_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true
  }
});

export default Users;