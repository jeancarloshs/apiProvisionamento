import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";

const Spreadsheets = sequelize.define("tbPlanilhas", {
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