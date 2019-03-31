require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});
const routes = require("express").Router();

const { User } = require("./app/models");

// routes.get("/", (req, res) => res.send(process.env.DB_USERNAME));

routes.get("/", async (req, res) => {
  const user = await User.create({
    name: "Luís Campos",
    email: "luis@gmail.com",
    password_hash: "luis"
  });

  return res.json({ user });
});

module.exports = routes;
