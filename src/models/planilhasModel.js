import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";

const Spreadsheets = sequelize.define("tbPlanilhas", {
  id: {
    type: DataTypes.BIGINT,
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
    type: DataTypes.BIGINT,
    allowNull: true,
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
});

export default Spreadsheets;