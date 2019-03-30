'use strict'

const Antl = use('Antl')

class Share {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      targetName: 'required',
      targetEmail: 'required|email'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Share
