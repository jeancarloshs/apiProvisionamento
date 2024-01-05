import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";

const OldProv = sequelize.define("PROVISIONAMENTO", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  clientes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tecnicoRua: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numberSerial: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipoDeAtivacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  posicionamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  patrimonioNX: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tecnicoSup: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: true,
  },
});

export default OldProv;