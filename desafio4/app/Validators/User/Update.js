'use strict'

class Update {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password: 'required',
      newpassword: 'required|confirmed'
    }
  }
}

module.exports = Update
