// Zero-dep static file server. Usage: node scripts/serve.js [port]
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || process.env.PORT || 8124);
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.json': 'application/json', '.md': 'text/markdown; charset=utf-8'
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let filePath = path.normalize(path.join(root, urlPath === '/' ? 'index.html' : urlPath));
  if (!filePath.startsWith(root)) { res.writeHead(400); return res.end('Bad request'); }
  fs.stat(filePath, (err, st) => {
    if (!err && st.isDirectory()) filePath = path.join(filePath, 'index.html');
    fs.readFile(filePath, (err2, data) => {
      if (err2) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(fs.readFileSync(path.join(root, '404.html')));
      }
      const head = {
        'Content-Type': mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=60'
      };
      if ((req.headers['accept-encoding'] || '').includes('gzip') && data.length > 860) {
        head['Content-Encoding'] = 'gzip';
        res.writeHead(200, head);
        return res.end(zlib.gzipSync(data));
      }
      res.writeHead(200, head);
      res.end(data);
    });
  });
}).listen(port, () => console.log(`placement local server on http://127.0.0.1:${port}/`));
