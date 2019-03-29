'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  events () {
    return this.hasMany('App/Models/Event')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
