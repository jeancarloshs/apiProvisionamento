import app from "./src/app.js";

// Aqui deixamos configurado para caso esteja em ambiente DEV use a porta 3000 ou a porta que está no .env
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// A porta que o servidor ira ouvir
app.listen(port, () => {
    console.log(" ");
    console.log(`############################################`);
    console.log(`# Servidor iniciado: http://localhost:${port} #`);
    console.log(`############################################`);
    console.log(" ");
  });
