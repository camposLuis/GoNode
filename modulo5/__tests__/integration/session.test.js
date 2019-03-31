const request = require("supertest");
const nodemailer = require("nodemailer");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

jest.mock("nodemailer");

const transport = {
  sendMail: jest.fn()
};

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  beforeAll(() => {
    nodemailer.createTransport.mockReturnValue(transport);
  });

  it("deve ser capaz de autenticar com credenciais válidas", async () => {
    const user = await factory.create("User", {
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
    const user = await factory.create("User", {
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
    const user = await factory.create("User", {
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
    const user = await factory.create("User");

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

  it("deve receber notificação por email quando autenticado", async () => {
    const user = await factory.create("User", {
      password: "luis"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "luis"
      });

    expect(transport.sendMail).toHaveBeenCalledTimes(1);
    expect(transport.sendMail.mock.calls[0][0].to).toBe(
      `${user.name} <${user.email}>`
    );
  });
});
