import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Positions = sequelize.define(
  "tbCargos",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    cargoFuncionario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    app: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: true,
    },
    update_at: {
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

export default Positions;
