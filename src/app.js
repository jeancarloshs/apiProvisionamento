import express from "express";
import db from "./config/dbConfig.js";

try {
  db.once("open", () => {
    console.log(" ");
    console.log("-----------------------------------------");
    console.log("- Conexão com o Banco feita com sucesso -");
    console.log("-----------------------------------------");
    console.log(" ");
  });
} catch (err) {
  db.on("error", console.log.bind(console, "Erro de conexão!!!", err));
}

const app = express();
