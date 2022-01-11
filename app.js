const hostname = "127.0.0.1";
const port = 3000;
const http = require("http");
const fs = require("fs");
const path = require("path");
const verboseDebug = true;

const server = http.createServer((req, res) => {
  debug("request starting");

  var filePath = "." + req.url;
  if (filePath == "./") filePath = "./index.html";

  debug("Path is: " + filePath);

  var extname = path.extname(filePath);
  var contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".wav":
      contentType = "audio/wav";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        fs.readFile("./404.html", (err, content) => {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content, "utf-8");
        });
      } else {
        res.writeHead(500);
        res.end("Sorry check with admin for error" + err.code + "..\n");
        res.end();
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function debug(msg) {
  if (verboseDebug) {
    console.log(msg);
  }
}
