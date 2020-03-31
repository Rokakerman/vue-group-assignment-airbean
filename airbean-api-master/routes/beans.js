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
  // console.log('req', req.body)
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
  // console.log('saveOrder', result)

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

router.post('/signin', (req, res) => {
  if (
    !Object.prototype.hasOwnProperty.call(req.body, 'userName') ||
    !req.body.userName.length
  )
    return res.send({ status: 400, message: 'Bad request. Missing userName' })

  if (
    !Object.prototype.hasOwnProperty.call(req.body, 'userEmail') ||
    !req.body.userEmail.length
  )
    return res.send({ status: 400, message: 'Bad request. Missing userEmail' })

  const user = {
    UUID: '',
    userName: '',
    userEmail: '',
    gdpr: 0,
    status: 200
  }
  console.log(req.body.UUID)
  if (
    !Object.prototype.hasOwnProperty.call(req.body, 'UUID') ||
    !req.body.UUID.length ||
    req.body.UUID != null
  ) {
    user.UUID = uuid()
  } else {
    user.UUID = req.body.UUID
  }

  user.userName = req.body.userName
  user.userEmail = req.body.userEmail
  user.gdpr = req.body.gdpr
  db.saveUser(user)

  res.send(JSON.stringify(user))
})

router.get('/orderhistory/:uuid', (req, res) => {
  if (
    !Object.prototype.hasOwnProperty.call(req.params, 'uuid') ||
    !req.params.uuid.length
  ) {
    return res.send({ status: 400, message: 'Bad request. Missing uuid' })
  }
  let order = db.getOrdersByUser(req.params.uuid)

  if (!Object.prototype.hasOwnProperty.call(order, 'UUID'))
    order = { status: 200 }
  else order.status = 200
  res.send(JSON.stringify(order))
})

module.exports = router
