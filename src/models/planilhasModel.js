import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

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
  app: {
    type: DataTypes.INTEGER,
    allowNull: false
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

export default Spreadsheets;