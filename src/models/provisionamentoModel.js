import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import User from "./usuarioModel";
import ServiceType from "./tipoDeServicoModel";

const Provisioning = sequelize.define("tbProvisionamento", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeCliente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  enderecoCliente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tecnicoRua: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  },
  numeroDeSerie: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  posicionamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  patrimonioNaxos: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tecnicoSup: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  },
  tipoDeServico: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: ServiceType,
      key: "id",
    },
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
});

export default Provisioning;