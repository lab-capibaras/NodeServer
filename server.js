const http = require('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('NodeServer prueba github 2 push\n');
});
server.listen(3000, () => console.log('Servidor listo'));
