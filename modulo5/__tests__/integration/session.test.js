const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const { User } = require("../../src/app/models");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("deve ser capaz de autenticar com credenciais válidas", async () => {
    const user = await User.create({
      name: "Luís",
      email: "luis@gmail.com",
      password: "luis"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "luis"
      });

    expect(response.status).toBe(200);
  });

  it("não deve poder autenticar com credenciais inválidas", async () => {
    const user = await User.create({
      name: "Luís",
      email: "luis@gmail.com",
      password: "luis"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "luiz"
      });

    expect(response.status).toBe(401);
  });

  it("deve retornar token jwt quando autenticado", async () => {
    const user = await User.create({
      name: "Luís",
      email: "luis@gmail.com",
      password: "luis"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "luis"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("deve ser capaz de acessar rotas privadas autenticadas", async () => {
    const user = await User.create({
      name: "Luís",
      email: "luis@gmail.com",
      password: "luis"
    });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("não deve poder acessar rotas privadas quando não autenticado", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it("não deve poder acessar rotas privadas quando não autenticado", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", "Bearer 123123");

    expect(response.status).toBe(401);
  });
});
