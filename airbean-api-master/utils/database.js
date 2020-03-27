const lowdb = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/database.json')
const database = lowdb(adapter)

function initiateDatabase() {
  if (!database.has('order').value()) database.defaults({ order: [] }).write()
}

function getOrdersByUser(uuid) {
  return database
    .get('order')
    .find({ UUID: uuid })
    .value()
}

function pushToOrder(obj) {
  database
    .get('order')
    .push(obj)
    .write()
}

function checkUserRegistered(uuid) {
  return (
    database
      .get('order')
      .find({ UUID: uuid })
      .value().userEmail.length > 0
  )
}

function updateTotalByUuid(uuid) {
  const { orders } = database
    .get('order')
    .find({ UUID: uuid })
    .value()

  database
    .get('order')
    .find({ UUID: uuid })
    .update('totalOrders', n =>
      orders.reduce((total, el) => {
        return (total += el.total)
      }, 0)
    )
    .write()
}

function saveOrder(uuid, orderNr, orderObj) {
  //   console.log('saving', uuid, orderObj)

  if (
    !database
      .get('order')
      .find({ UUID: uuid })
      .value()
  ) {
    pushToOrder({
      UUID: uuid,
      orders: [],
      totalOrders: 0,
      userName: '',
      userEmail: ''
    })
  }
  database
    .get('order')
    .find({ UUID: uuid })
    .get('orders')
    .push({
      orderNr: orderNr,
      total: orderObj.reduce((total, el) => {
        return (total += el.price * el.qty)
      }, 0),
      items: [...orderObj]
    })
    .write()

  updateTotalByUuid(uuid)

  const order = database
    .get('order')
    .find({ UUID: uuid })
    .get('orders')
    .find({ orderNr: orderNr })
    .value()
}

function saveUser(user) {
  if (
    !database
      .get('order')
      .find({ UUID: user.uuid })
      .value()
  ) {
    pushToOrder({
      UUID: user.uuid,
      orders: [],
      totalOrders: 0,
      userName: user.userName,
      userEmail: user.userEmail,
      gdpr: user.gdpr
    })
  } else
    database
      .get('order')
      .find({ UUID: user.uuid })
      .update('userName', n => user.userName)
      .update('userEmail', n => user.userEmail)
      .update('gdpr', n => user.gdpr)
      .write()
}

exports.saveUser = saveUser
exports.initiateDB = initiateDatabase
exports.getOrdersByUser = getOrdersByUser
exports.saveOrder = saveOrder
exports.checkUserRegistered = checkUserRegistered
