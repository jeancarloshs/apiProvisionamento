import pg from 'pg';
import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

let dbURL = process.env.SUPABASE_URL;
let dbPassword = process.env.SUPABASE_PASSWORD;
let dbPort = process.env.SUPABASE_PORT;
let dbUsername = process.env.SUPABASE_DBUSER;
let dbHostName = process.env.SUPABASE_HOSTNAME;

if (!dbURL || !dbPassword || !dbPort || !dbUsername || !dbHostName) {
  throw new Error("Variáveis de ambiente incompletas. Verifique se SUPABASE_URL, SUPABASE_PASSWORD, SUPABASE_PORT, SUPABASE_DBUSER e SUPABASE_HOSTNAME estão definidos.");
}

const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectModule: pg,
  host: dbURL,
  username: dbUsername,
  password: dbPassword,
  database: dbHostName,
  port: 5432,
  define: {
    timestamps: false,
    underscored: false
  }
})

export default sequelize;