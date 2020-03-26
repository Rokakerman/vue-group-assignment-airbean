const { Router } = require('express')
const router = new Router()
const fs = require('fs')
const uuid = require('uuid-random')
const { generateOrderNr, generateETA } = require('../utils/utils')

const db = require('../utils/database')

db.initiateDB()

router.get('/', async (req, res) => {
  const menu = fs.createReadStream('data/menu.json')
  menu.pipe(res)
})

router.post('/', async (req, res) => {
  console.log('req', req.body)
  if (
    !Object.prototype.hasOwnProperty.call(req.body, 'items') ||
    !req.body.items.length
  ) {
    return res.send({ status: 400, message: 'Bad request. Missing items' })
  }

  let UUID = ''
  if (Object.prototype.hasOwnProperty.call(req.body, 'UUID'))
    UUID = req.body.UUID

  if (UUID === '') UUID = uuid()
  const orderNr = generateOrderNr()
  const result = db.saveOrder(UUID, orderNr, req.body.items)
  console.log('saveOrder', result)
  //   console.log('post save')

  if (
    !Object.prototype.hasOwnProperty.call(result, 'items') ||
    !result.items.length
  ) {
    return res.send({ status: 503, message: 'Server error saving the order' })
  }
  const order = {
    status: 200,
    message: 'ok',
    UUID: UUID,
    userRegistered: db.checkUserRegistered(UUID),
    eta: generateETA(),
    orderNr: orderNr
  }

  setTimeout(() => {
    res.send(order)
  }, 2000)
})

router.get('/key', (req, res) => {
  const key = {
    key: uuid()
  }
  res.send(JSON.stringify(key))
})

module.exports = router
