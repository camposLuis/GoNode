'use strict'

const Event = use('App/Models/Event')
const User = use('App/Models/User')
const Kue = use('Kue')
const Job = use('App/Jobs/ShareMail')
const moment = use('moment')

class ShareController {
  async shareEvent ({ request, response, auth, params }) {
    const target = request.only(['targetName', 'targetEmail'])

    const user = await User.findOrFail(auth.user.id)
    const issuer = {
      issuerName: user.name,
      issuerEmail: user.email
    }

    const event = await Event.findOrFail(params.id)
    const bodyMail = {
      title: event.title,
      location: event.location,
      dateEvent: moment(event.date).format('DD/MM/YYYY'),
      timeEvent: moment(event.date).format('HH:mm')
    }

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Você não pode compartilhar esse evento.'
        }
      })
    }

    Kue.dispatch(Job.key, { target, issuer, bodyMail }, { attempts: 3 })
  }
}

module.exports = ShareController
