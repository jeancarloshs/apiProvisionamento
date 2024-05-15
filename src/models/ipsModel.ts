import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig";
import { AppsModel } from "./appsModel";
import { UsersModel } from "./usuariosModel";

const IpsModel = sequelize.define("tbIps", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: UsersModel,
            key: 'id'
        }
    },
    userApp: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: AppsModel,
            key: 'id',
        }
    },
    countryName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    countryCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estadoAbreviado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estadoCompleto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cidadeNome: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cepCidade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    timezone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    org: {
        type: DataTypes.STRING,
        allowNull: true
    },
    as: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ipQuery: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
    },
},
    {
        tableName: "tbIps",
        freezeTableName: true
    })

IpsModel.belongsTo(UsersModel, { foreignKey: "userId" })
IpsModel.belongsTo(AppsModel, { foreignKey: "userApp" })

export default IpsModel