const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { purchaseAd, user, content } = job.data
    await Mail.sendMail({
      from: '"Luís Henrique Silva Campos" <luiscampos.sistema@gmail.com>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      template: 'purchase',
      context: { user, content, purchaseAd }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
