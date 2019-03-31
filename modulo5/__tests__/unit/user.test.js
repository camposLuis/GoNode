const bcrypt = require("bcryptjs");

const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("deve criptografar a senha do usuário", async () => {
    const user = await User.create({
      name: "Luís",
      email: "luis@gmail.com",
      password: "luis"
    });

    const compareHash = await bcrypt.compare("luis", user.password_hash);

    expect(compareHash).toBe(true);
  });
});
