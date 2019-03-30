'use strict'

const Event = use('App/Models/Event')
const moment = use('moment')

class EventController {
  async index ({ auth }) {
    const events = await Event.query()
      .where({
        user_id: auth.user.id
      })
      .fetch()

    return events
  }

  async datevent ({ request, auth, response }) {
    const { dtinicio, dtfim } = request.get()

    if (!dtinicio || !dtfim) {
      return response.status(401).send({
        error: {
          message: 'Informe data início e data fim para realizar a consulta'
        }
      })
    }

    const events = await Event.query()
      .whereBetween('date', [
        moment(dtinicio).format('YYYY-MM-DD HH:mm:ss'),
        moment(dtfim)
          .add(86399, 'seconds')
          .format('YYYY-MM-DD HH:mm:ss')
      ])
      .andWhere({
        user_id: auth.user.id
      })
      .fetch()

    return events
  }

  async store ({ request, response, auth }) {
    const data = request.only(['title', 'location', 'date'])

    const eventVerify = await Event.query()
      .where({
        user_id: auth.user.id,
        date: data.date
      })
      .first()

    if (eventVerify !== null) {
      return response.status(401).send({
        error: { message: 'Já existe um evento na mesma data e horário' }
      })
    }

    const event = await Event.create({ ...data, user_id: auth.user.id })

    return event
  }

  async show ({ params, auth, response }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: { message: 'Este evento não tem vínculo com o usuário logado' }
      })
    }

    return event
  }

  async update ({ params, request, response, auth }) {
    const event = await Event.findOrFail(params.id)

    const data = request.only(['title', 'location', 'date'])

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: { message: 'Este evento não tem vínculo com o usuário logado' }
      })
    }

    if (event.getIsNotUpdateOrDelete(event)) {
      return response.status(401).send({
        error: { message: 'Evento não pode ser alterado' }
      })
    }

    event.merge(data)

    await event.save()

    return event
  }

  async destroy ({ params, auth, response }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: { message: 'Este evento não tem vínculo com o usuário logado' }
      })
    }

    if (event.getIsNotUpdateOrDelete(event)) {
      return response.status(401).send({
        error: { message: 'Evento não pode ser excluído' }
      })
    }

    await event.delete()
  }
}

module.exports = EventController
