import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig.js";
import Users from "./usuariosModel.js";
import AppsModel from "./appsModel.js";

const LogsModel = sequelize.define("tbLogs", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        },
    },
    userApp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AppsModel,
            key: 'id'
        }
    },
    userToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userIP: {
        type: DataTypes.STRING,
        allowNull: true
    },
    routeRequest: {
        type: DataTypes.STRING,
        allowNull: true
    },
    methodRequest: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userAgent: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true
    }
},
    {
        tableName: "tbLogs",
        freezeTableName: true
    }
)

LogsModel.belongsTo(Users, { foreignKey: "userId" });
LogsModel.belongsTo(AppsModel, { foreignKey: "userApp" });

export default LogsModel;