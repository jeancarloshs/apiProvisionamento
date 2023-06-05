import app from "./src/app.js";

// Aqui deixamos configurado para caso esteja em ambiente DEV use a porta 3000 ou a porta que está no .env
const port = process.env.PORT || 3000;

// A porta que o servidor ira ouvir
app.listen(port, () => {
    console.log(" ");
    console.log(`############################################`);
    console.log(`# Servidor iniciado: http://localhost:${port} #`);
    console.log(`############################################`);
    console.log(" ");
  });