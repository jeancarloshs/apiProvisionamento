import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

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

export default ServiceType;
