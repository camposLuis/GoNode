const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send(`Bem-Vindo, ${req.query.name}`);
});

app.get("/nome/:name", (req, res) => {
  return res.json({
    message: `Welcome, ${req.params.name}`
  });
});

app.listen(3000);
