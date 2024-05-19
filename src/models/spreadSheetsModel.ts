"use strict";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";
import { ISpreadsheet } from "../types/spreadsheetTypes";

const SpreadSheetsModel = sequelize.define("tbPlanilhas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomePlanilha: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  urlPlanilha: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  planilhaSelecionada: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  app: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  },
});

export { SpreadSheetsModel };

export function SpreadSheetsToMap(spreadsheets: any[]): ISpreadsheet[] {
  return spreadsheets.map(model => ({
    id: model.id,
    nomePlanilha: model.nomePlanilha,
    urlPlanilha: model.urlPlanilha,
    planilhaSelecionada: model.planilhaSelecionada,
    app: model.app,
    created_at: model.created_at,
    updated_at: model.updated_at
  }));
}
