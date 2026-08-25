const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3001;

const tiposMime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const servidor = http.createServer((req, res) => {
  let caminhoArquivo = "." + req.url;

  if (caminhoArquivo === "./") {
    caminhoArquivo = "./index.html";
  }

  const extensao = path.extname(caminhoArquivo);
  const tipoConteudo = tiposMime[extensao] || "application/octet-stream";

  fs.readFile(caminhoArquivo, (erro, conteudo) => {
    if (erro) {
      if (erro.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>404 - Página não encontrada</h1>");
      } else {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Erro interno do servidor");
      }
    } else {
      res.writeHead(200, { "Content-Type": tipoConteudo });
      res.end(conteudo);
    }
  });
});

servidor.listen(PORT, '0.0.0.0',() => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});