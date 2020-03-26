const lowdb = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/database.json')
const database = lowdb(adapter)

function initiateDatabase() {
  //   console.log('init db', database.has('order').value())

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

  // console.log('updtotals', orders)

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
    // console.log('here')
    pushToOrder({
      UUID: uuid,
      orders: [],
      totalOrders: 0,
      userName: '',
      userEmail: ''
    })
    // database
    //   .get('order')
    //   .push({ UUID: uuid, orders: [], userName: '', userEmail: '' })
    //   .write()
  }

  //   const pippo = database
  //     .get('order')
  //     .find({ UUID: 1 })
  //     .value()

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
  //   console.log(
  //     'user-orders',
  //     database
  //       .get('order')
  //       .find({ UUID: uuid })
  //       .value()
  //   )
  return database
    .get('order')
    .find({ UUID: uuid })
    .get('orders')
    .find({ orderNr: orderNr })
    .value()
}

exports.initiateDB = initiateDatabase
exports.getOrdersByUser = getOrdersByUser
exports.saveOrder = saveOrder
exports.checkUserRegistered = checkUserRegistered
