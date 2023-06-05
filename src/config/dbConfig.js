import postgres from "postgres";
// import Client from "pg";
import * as dotenv from "dotenv";
dotenv.config();

let dbURL = process.env.SUPABASE_URL;
let dbPassword = process.env.SUPABASE_PASSWORD;
let dbPort = process.env.SUPABASE_PORT;
let dbUsername = process.env.SUPABASE_DBUSER;
let dbHostName = process.env.SUPABASE_HOSTNAME;

// const db = postgres(`postgresql://postgres:${dbPassword}@${dbURL}:${dbPort}/postgres`)

const db = postgres(`postgresql://postgres:${dbPassword}@${dbURL}:${dbPort}/postgres`, {
  host                 : dbURL,
  port                 : dbPort,
  database             : dbHostName,
  user                 : dbUsername,
  password             : dbPassword,
})

export default db;