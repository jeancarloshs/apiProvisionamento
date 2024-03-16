import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

let dbURL = process.env.SUPABASE_URL;
let dbPassword = process.env.SUPABASE_PASSWORD;
let dbPort = process.env.SUPABASE_PORT;
let dbUsername = process.env.SUPABASE_DBUSER;
let dbHostName = process.env.SUPABASE_HOSTNAME;

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: dbURL,
  username: dbUsername,
  password: dbPassword,
  database: dbHostName,
  port: dbPort,
  define: {
    timestamps: false,
    underscored: false
  }
})

export default sequelize;