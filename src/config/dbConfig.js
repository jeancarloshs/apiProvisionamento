import postgres from "postgres";
import * as dotenv from dotenv;
dotenv.config();

let dbURL = process.env.SUPABASE_URL;
let dbPassword = process.env.SUPABASE_PASSWORD;
let dbPort = process.env.SUPABASE_PORT;

const db = postgres(`postgresql://postgres:${dbPassword}@${dbURL}:${dbPort}/postgres`)

export default db;