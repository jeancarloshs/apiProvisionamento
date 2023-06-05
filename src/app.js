import express from "express";
import db from "./config/dbConfig.js";
import routes from "./routes/routes.js";

// try {
//   db.once("open", () => {
//     console.log(" ");
//     console.log("-----------------------------------------");
//     console.log("- Conexão com o Banco feita com sucesso -");
//     console.log("-----------------------------------------");
//     console.log(" ");
//   });
// } catch (err) {
//   db.on("error", console.log.bind(console, "Erro de conexão!!!", err));
// }

async function connectToDatabase() {
    try {
      await db.connect();
      console.log('Connected to the database!');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
    db.on('error', (error) => {
        console.error('Database error:', error);
      });
      
  }
  

const app = express();

// é um recurso do Express que vai conseguir fazer interpretar o que está chegando via post ou via put
// e transformar aquilo em um objeto para eu poder armazenar, visualizar e manipular.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes(app);

app.use("/", routes);

export default app;