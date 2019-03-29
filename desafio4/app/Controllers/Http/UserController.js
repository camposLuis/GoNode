'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ request, response, auth }) {
    const { name, password, newpassword } = request.all()

    const user = await User.findByOrFail('id', auth.user.id)

    const passwordverify = await Hash.verify(password, user.password)

    if (password && newpassword) {
      if (!passwordverify) {
        return response
          .status(401)
          .send({ error: { message: 'O password atual está incorreto' } })
      }

      if (name) {
        user.name = name
      }

      user.password = newpassword
    }

    await user.save()

    return user
  }
}

module.exports = UserController
