const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({
      where: { provider: true }
    })

    if (req.session.user.provider === true) {
      const appointments = await Appointment.findAll({
        include: [{ model: User, as: 'user' }],
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              moment()
                .startOf('day')
                .format(),
              moment()
                .endOf('day')
                .format()
            ]
          }
        }
      })

      return res.render('schedule/index', { appointments })
    }

    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
