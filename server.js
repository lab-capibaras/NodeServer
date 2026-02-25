const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // Configuramos el texto para que acepte acentos y formato HTML
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  res.end('<h1>Test Node Github Prueba Push 1</h1><p>Prueba Contenedor</p>');
});

// El puerto 3000 es clave porque es el que configuraste en tu docker-compose
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor Node listo ${PORT}`);
});
