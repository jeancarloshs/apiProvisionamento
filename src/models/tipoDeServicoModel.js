import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const ServiceType = sequelize.define("tbTipoDeServico", {
  id: {
    type: DataTypes.BIGINT,
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
  update_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
}, {
  tableName: "tbTipoDeServico",
  freezeTableName: true
});

export default ServiceType;
