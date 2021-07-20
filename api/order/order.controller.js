const orderService = require('./order.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getOrder(req, res) {
    console.log('*****', req.params.id);
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
        logger.error('Failed to delete order', err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}

async function updateOrder(req, res) {
    console.log('updating order in controller**************', req.body.id);
    try {
        const order = req.body.id
        const savedOrder = await orderService.update(order)
        console.log('savedOrder',savedOrder);
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
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    }
}

async function addReview(){
    try {
        var review = req.body
        review.byUserId = req.session.user._id
        review = await orderService.addReview(review)
        
        // prepare the updated review for sending out
        review.byUser = await userService.getById(review.byUserId)
        review.aboutUser = await userService.getById(review.aboutUserId)

        console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'review-added', data: review})
        // socketService.emitToAll({type: 'user-updated', data: review.byUser, room: req.session.user._id})
        res.send(review)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getOrder,
    getOrders,
    deleteOrder,
    updateOrder,
    addOrder,
    addReview,
}