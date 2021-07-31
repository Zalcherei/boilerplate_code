const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const http_host = 'localhost';
const http_port = 8000;
const webcoket_port = 8090;
const websocket_code = fs.readFileSync(path.join(__dirname, 'cw.js'), 'utf-8');

const wss = new WebSocket.Server({
  port: webcoket_port
});

function servePageIfExists (route, res) {
  if (fs.existsSync(route)) {
    if(fs.statSync(route).isDirectory()) {
      return servePageIfExists(path.join(route, './index.html'), res);
    } else if (fs.statSync(route).isFile()) {
      res.writeHead(200);
      let file = fs.readFileSync(route);
      if (route.endsWith('.html')) {
        file = `${file.toString()}\n\n<script>${websocket_code}</script>`;
      }
      res.end(file);
      return true;
    }
  }
  return false;
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const method = req.method.toLowerCase();
  if (method == 'get') {
    const route = path.normalize(path.join(__dirname, './', req.url));
    if (servePageIfExists(route, res)) {
      return;
    }
  }
  res.writeHead(404);
});
server.listen(http_port, http_host, () => {
  console.log(`Server running on http://${http_host}:${http_port}`)
});