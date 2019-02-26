const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({
      content,
      ad,
      user: user._id
    })

    Queue.create(PurchaseMail.key, {
      purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }

  async index (req, res) {
    const purchase = await Purchase.find()
      .populate({
        path: 'ad',
        populate: {
          path: 'author'
        }
      })
      .populate('user')

    return res.json(purchase)
  }

  async updateAd (req, res) {
    const { id } = req.params

    const { ad } = await Purchase.findById(id).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: 'Você não é o autor do anúncio' })
    }

    if (ad.purchaseBy) {
      return res.status(400).json({ error: 'Este anúncio já foi comprado' })
    }

    ad.purchaseBy = id

    await ad.save()

    return res.json(ad)
  }
}

module.exports = new PurchaseController()
