"use strict";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/config/dbConfig";
import StatesModel from "./estadosModel";
import { IApps } from "../types/appsTypes";

const AppsModel = sequelize.define("tbApp", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nomeApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  'cpf/cnpj': {
    type: DataTypes.STRING,
    allowNull: true,
  },
  enderecoApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefoneApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cidadeApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cepApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estadoApp: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: StatesModel,
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: true,
  }
},
  {
    tableName: "tbApp",
    freezeTableName: true,
  }
);

AppsModel.belongsTo(StatesModel, { foreignKey: 'estadoApp' })

export { AppsModel };

export function mapAppsToIApps(AppsModel: any[]): IApps[] {
  return AppsModel.map(model => ({
    id: model.id,
    nomeApp: model.nomeApp,
    "cpf/cnpj": model["cpf/cnpj"],
    enderecoApp: model.enderecoApp,
    telefoneApp: model.telefoneApp,
    cidadeApp: model.cidadeApp,
    cepApp: model.cepApp,
    estadoApp: model.estadoApp,
    created_at: model.created_at,
    updated_at: model.updated_at,
    tbEstado: model.tbEstado // Certifique-se de ajustar isso de acordo com sua lógica
  }));
}