const bcrypt = require("bcryptjs");

const factory = require("../factories");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("deve criptografar a senha do usuário", async () => {
    const user = await factory.create("User", {
      password: "luis"
    });

    const compareHash = await bcrypt.compare("luis", user.password_hash);

    expect(compareHash).toBe(true);
  });
});
