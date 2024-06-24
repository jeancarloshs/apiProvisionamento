"use strict";
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig";
import { ServiceType } from "./tipoDeServicoModel";
import { UsersModel } from "./usersModel";
import { AppsModel } from "./appsModel";
import { IProvisionamento } from "../../types/provisionamentoTypes";

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
      model: UsersModel,
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
      model: UsersModel,
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

Provisioning.belongsTo(UsersModel, { foreignKey: 'tecnicoRua' });
Provisioning.belongsTo(UsersModel, { foreignKey: 'tecnicoSup' });
Provisioning.belongsTo(ServiceType, { foreignKey: 'tipoDeServico' });
Provisioning.belongsTo(AppsModel, { foreignKey: 'app' });

export { Provisioning };

export function provisioningToMap(Provisioning: any[]): IProvisionamento[] {
  return Provisioning.map(model => ({
    id: model.id,
    nomeCliente: model.nomeCliente,
    enderecoCliente: model.enderecoCliente,
    numeroDeSerie: model.numeroDeSerie,
    posicionamento: model.posicionamento,
    patrimonioNaxos: model.patrimonioNaxos,
    created_at: model.created_at,
    updated_at: model.updated_at,
    tbUsuario: model.tbUsuario,
    tbTipoDeServico: model.tipoDeAtivacao,
    tbApp: model.app,
  }))
}