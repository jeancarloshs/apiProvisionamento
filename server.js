import app from "./src/app.js";
import { CorsOptions } from "cors";

// Aqui deixamos configurado para caso esteja em ambiente DEV use a porta 3000 ou a porta que está no .env
const port = process.env.PORT || 3000;

app.use(CorsOptions());

// A porta que o servidor ira ouvir
app.listen(port, () => {
    console.log(" ");
    console.log(`############################################`);
    console.log(`# Servidor iniciado: http://localhost:${port} #`);
    console.log(`############################################`);
    console.log(" ");
  });
