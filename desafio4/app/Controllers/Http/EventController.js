'use strict'

const Database = use('Database')
const Event = use('App/Models/Event')

class EventController {
  async index ({ request, response, view }) {}

  async store ({ request, response, auth }) {
    const data = request.only(['title', 'date', 'schedule'])
    const places = request.input('places')

    const eventVerify = await Event.query()
      .where({
        user_id: auth.user.id,
        date: data.date,
        schedule: data.schedule
      })
      .first()

    if (eventVerify !== null) {
      return response
        .status(401)
        .send({ error: { message: 'Este horário já foi utilizado' } })
    }

    const trx = await Database.beginTransaction()

    const event = await Event.create({ ...data, user_id: auth.user.id }, trx)

    await event.places().createMany(places, trx)

    await trx.commit()

    return event
  }

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {}
}

module.exports = EventController
