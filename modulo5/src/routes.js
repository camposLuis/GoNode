const routes = require("express").Router();

const { User } = require("./app/models");

routes.get("/", async (req, res) => {
  const user = await User.create({
    name: "Luís Campos",
    email: "luis@gmail.com",
    password_hash: "luis"
  });

  return res.json({ user });
});

module.exports = routes;
