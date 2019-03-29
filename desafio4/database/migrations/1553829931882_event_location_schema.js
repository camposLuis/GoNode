'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventLocationSchema extends Schema {
  up () {
    this.create('event_locations', table => {
      table.increments()
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('place').notNullable()
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('event_locations')
  }
}

module.exports = EventLocationSchema
