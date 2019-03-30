'use strict'

const Mail = use('Mail')

class ShareMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'ShareMail-job'
  }

  async handle ({ target, issuer, bodyMail }) {
    const { targetName, targetEmail } = target
    const { issuerName, issuerEmail } = issuer
    const { title, location, dateEvent, timeEvent } = bodyMail

    try {
      await Mail.send(
        ['emails.event_share'],
        { targetName, title, location, dateEvent, timeEvent, issuerName },
        message => {
          message
            .to(targetEmail)
            .from(issuerEmail, 'Proprietário do Evento')
            .subject('Um evento foi compartilhado com você')
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = ShareMail
