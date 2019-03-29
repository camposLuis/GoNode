'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventSchema extends Schema {
  up () {
    this.create('events', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title', 80).notNullable()
      table.date('date').notNullable()
      table.time('schedule').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventSchema
