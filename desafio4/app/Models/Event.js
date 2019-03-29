'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  users () {
    return this.belongsTo('App/Models/User')
  }

  places () {
    return this.hasMany('App/Models/EventLocation')
  }
}

module.exports = Event
