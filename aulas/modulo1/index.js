const express = require("express");

const app = express();

const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  );

  req.appName = "GoNode";

  return next();
};

app.use(logMiddleware);

app.get("/", (req, res) => {
  return res.send(`Bem-Vindo ao ${req.appName}, ${req.query.name}`);
});

app.get("/nome/:name", (req, res) => {
  return res.json({
    message: `Bem-Vindo, ${req.params.name}`
  });
});

app.listen(3000);
