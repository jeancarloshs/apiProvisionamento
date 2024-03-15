import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";

const AppsModel = sequelize.define("tbApp", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
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
      key: "id"
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: true,
  },
  update: {
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

export default AppsModel;
