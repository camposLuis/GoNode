const http = require("http");

http
  .createServer((req, res) => {
    console.log(req);
    return res.end("Hello World");
  })
  .listen(3000);
