import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";

const StatesModel = sequelize.define("tbEstados", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
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
  update_at: {
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