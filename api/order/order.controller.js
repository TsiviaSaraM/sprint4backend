const orderService = require('./order.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getOrder(req, res) {
    try {
        const orderId = req.params.id
        const order = await orderService.getById(orderId)
        res.send(order)
    } catch (err) {
        logger.error('Failed to get order in controller', err, req.params.id)
        res.status(500).send({ err: 'Failed to get order' })
    }
}

async function getOrders(req, res) {
    try {
        const filterBy = req.query;
        // const filterBy = {
        //     txt: req.query?.txt || '',
        //     minBalance: +req.query?.minBalance || 0
        // }
        const orders = await orderService.query(filterBy)
        res.send(orders)
    } catch (err) {
        logger.error('Failed to get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete order', req.params.id, err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}

async function updateOrder(req, res) {
    try {
        const order = req.body
        const savedOrder = await orderService.update(order)
        res.send(savedOrder)
        // socketService.broadcast({type: 'order-updated', data: order, to:savedOrder._id})
        // return savedOrder
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    }
}


async function addOrder(req, res) {
    try {
        const order = req.body
        const savedOrder = await orderService.add(order)
        res.send(savedOrder)
        // socketService.broadcast({type: 'order-updated', data: order, to:savedOrder._id})
    } catch (err) {
        logger.error('Failed to update order', err, req.body)
        res.status(500).send({ err: 'Failed to update order'})
    }
}

// async function addOrder(){
//     try {
//         var order = req.body
//         order.byUserId = req.session.user._id
//         order = await orderService.addOrder(order)
        
//         // prepare the updated order for sending out
//         order.byUser = await userService.getById(order.byUserId)
//         order.aboutUser = await userService.getById(order.aboutUserId)

//         console.log('CTRL SessionId:', req.sessionID);
//         // socketService.broadcast({type: 'order-added', data: order})
//         // socketService.emitToAll({type: 'user-updated', data: order.byUser, room: req.session.user._id})
//         res.send(order)

//     } catch (err) {
//         console.log(err)
//         logger.error('Failed to add order', err)
//         res.status(500).send({ err: 'Failed to add order' })
//     }
// }

module.exports = {
    getOrder,
    getOrders,
    deleteOrder,
    updateOrder,
    addOrder,
    addOrder,
}