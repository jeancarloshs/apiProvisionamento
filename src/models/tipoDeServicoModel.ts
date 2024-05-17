"use strict";
import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import { IServices } from "../types/servicesTypes";

const ServiceType = sequelize.define("tbTipoDeServico", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipoDeServico: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  app: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
}, {
  tableName: "tbTipoDeServico",
  freezeTableName: true
});

export { ServiceType };

export function ServicesToMap(ServiceType: any[]): IServices[] {
  return ServiceType.map(model => ({
    id: model.id,
    tipoDeServico: model.tipoDeServico,
    app: model.app,
    created_at: model.created_at,
    updated_at: model.updated_at
  }))
}
