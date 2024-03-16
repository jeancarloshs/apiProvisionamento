import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig.js";
import StatesModel from "./estadosModel.js";

const AppsModel = sequelize.define("tbApp", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nomeApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  'cpf/cnpj': {
    type: DataTypes.STRING,
    allowNull: true,
  },
  enderecoApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefoneApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cidadeApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cepApp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estadoApp: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: StatesModel,
      key: 'id',
    },
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
  }
},
  {
    tableName: "tbApp",
    freezeTableName: true,
  }
);

AppsModel.belongsTo(StatesModel, { foreignKey: 'estadoApp' })

export default AppsModel;
