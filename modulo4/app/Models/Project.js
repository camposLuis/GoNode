'use strict'

const Model = use('Model')

class Project extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  task () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
