import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import ServiceType from "./tipoDeServicoModel.js";
import Users from "./usuariosModel.js";
import AppsModel from "./appsModel.js";
// import { json } from "body-parser";

const Provisioning = sequelize.define("tbProvisionamento", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id',
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
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id',
    },
  },
  tipoDeServico: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: ServiceType,
      key: 'id',
    },
  },
  app: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AppsModel,
      key: "id"
    }
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
    tableName: "tbProvisionamento",
    freezeTableName: true
  },
);

Provisioning.belongsTo(Users, { foreignKey: 'tecnicoRua' });
Provisioning.belongsTo(Users, { foreignKey: 'tecnicoSup' });
Provisioning.belongsTo(ServiceType, { foreignKey: 'tipoDeServico' });
Provisioning.belongsTo(AppsModel, { foreignKey: 'app' });

export default Provisioning;