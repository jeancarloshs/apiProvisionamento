"use strict";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";

const StatesModel = sequelize.define("tbEstados", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  estadosCompleto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estadosAbreviado: {
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