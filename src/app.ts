import express from "express";
import db from "./config/dbConfig";
import routes from "./routes/routes";
import cors from "cors";

const app = express();

app.use(cors());

// é um recurso do Express que vai conseguir fazer interpretar o que está chegando via post ou via put
// e transformar aquilo em um objeto para eu poder armazenar, visualizar e manipular.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);


export default app;
