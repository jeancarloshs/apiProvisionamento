import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";
import { IArquivos } from "../types/archivesTypes";

const Archives = sequelize.define("tbArquivos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
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
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: true,
  },
},
  {
    tableName: "tbArquivos",
    freezeTableName: true
  });

export { Archives };

export function archivesToMap(Archives: any[]): IArquivos[] {
  return Archives.map(model => ({
    id: model.id,
    nome: model.nome,
    url: model.url,
    app: model.app,
    created_at: model.created_at,
    updated_at: model.updated_at,
  }));
}
