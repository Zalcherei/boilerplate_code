import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import path from 'path';
import WebSocket, { WebSocketServer } from 'ws';

const __dirname = path.resolve();

const hotReload = readFileSync(path.join(__dirname, 'cw.js'), 'utf-8');

const http_host = 'localhost';
const http_port = 8000;
const webcoket_port = 8090;

const wss = new WebSocketServer({
  port: webcoket_port
});

function serveIfExists(route, res) {
  if (existsSync(route)) {
    if(statSync(route).isDirectory()) {
      return serveIfExists(path.join(route, './index.html'), res);
    } else if (statSync(route).isFile()) {
      res.writeHead(200);
      let file = readFileSync(route);
      if (route.endsWith('.html')) {
        file = `${file.toString()}\n\n<script>${hotReload}</script>`;
      }
      res.end(file);
      return true;
    }
  }
  return false;
}
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const method = req.method.toLowerCase();
  if (method == 'get') {
    const route = path.normalize(path.join(__dirname, './', req.url));
    if (serveIfExists(route, res)) {
      return;
    }
  }
  res.writeHead(404);
});

server.listen(http_port, http_host, () => {
  console.log(`Server running at http://${http_host}:${http_port}`);
});