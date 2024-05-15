import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";
import { ICargos } from "../types/cargosTypes";

const Positions = sequelize.define(
  "tbCargos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cargoFuncionario: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    tableName: "tbCargos",
    freezeTableName: true,
  }
);

export { Positions };

export function mapCargosToICargos(Positions: any[]): ICargos[] {
  return Positions.map(model => ({
    id: model.id,
    cargoFuncionario: model.cargoFuncionario,
    created_at: model.created_at,
    updated_at: model.updated_at,
  }))
}
