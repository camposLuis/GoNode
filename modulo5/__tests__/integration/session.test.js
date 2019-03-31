const request = require("supertest");

const app = require("../../src/app");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("deve ser capaz de autenticar com credenciais válidas", async () => {
    const user = User.create({
      name: "Luís",
      email: "luis@gmail.com",
      password_hash: "luis"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "luis"
      });

    expect(response.status).toBe(200);
  });
});
