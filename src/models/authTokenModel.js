import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/dbConfig.js";
import Users from "./usuariosModel.js";
import AppsModel from "./appsModel.js";

const AuthTokenModel = sequelize.define("tbAuthToken", {
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
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true
    }
},
    {
        tableName: "tbAuthToken",
        freezeTableName: true
    }
)

AuthTokenModel.belongsTo(Users, { foreignKey: "userId" });
AuthTokenModel.belongsTo(AppsModel, { foreignKey: "userApp" });

export default AuthTokenModel;