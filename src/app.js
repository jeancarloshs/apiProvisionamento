import express from "express";
import db from "./config/dbConfig.js";
import routes from "./routes/routes.js";

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Substitua pelo domínio do seu aplicativo front-end
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Adicione os métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// routes(app);

app.use("/", routes);

export default app;
