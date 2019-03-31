const { User } = require("../models");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Usuário não existe" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Usuário não existe" });
    }

    return res.json({
      token: await user.generateToken()
    });
  }
}

module.exports = new SessionController();
