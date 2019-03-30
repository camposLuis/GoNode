'use strict'

const moment = use('moment')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  users () {
    return this.belongsTo('App/Models/User')
  }

  places () {
    return this.hasMany('App/Models/EventLocation')
  }

  getIsNotUpdateOrDelete ({ date }) {
    console.log(date)
    return (
      moment(date).format('YYYY-MM-DD HH:mm:ss') <=
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    )
  }
}

module.exports = Event
