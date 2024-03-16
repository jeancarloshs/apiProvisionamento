import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig.js";

const StatesModel = sequelize.define("tbEstados", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  estadosCompletos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estadosAbreviados: {
    type: DataTypes.STRING,
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
},
{
  tableName: "tbEstados",
  freezeTableName: true,
});

export default StatesModel;