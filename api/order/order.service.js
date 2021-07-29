
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByOrdername,
    remove,
    update,
    add,
    addMsg,
}

async function query(filterBy = {}) {
    
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('order')
        var orders = await collection.find(criteria).toArray()
        // var orders = await collection.find({$query: criteria, $orderby:{capacity: 1}}).toArray()
        orders = orders.map(order => {
            return order
            return order.hostId
        })
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ "_id": orderId })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}
async function getByOrdername(ordername) {
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ ordername })
        return order
    } catch (err) {
        logger.error(`while finding order ${ordername}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ _id: ObjectId(orderId) });
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function update(order) {
    try {
        // peek only updatable fields!
        let orderToSave = order
        console.log('update order in service***', {...orderToSave});
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ '_id': order._id }, { $set: {...orderToSave} })
        return order;
    } catch (err) {
        logger.error(`cannot update order ${order._id} in service`, err)
        throw err
    }
}

async function add(order) {
    try {
        // peek only updatable fields!
        const orderToAdd = order
        orderToAdd.createdAt = new Date()
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                ordername: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}

async function addMsg(orderId, msg){
    try {
        let order = await getById(orderId)
        order.msgs.push(msg)
        order = await update(order)
        return order
    } catch (err) {
        logger.error('cannot addMsg in order.service', err)
        throw err
    }
}

//not using here because there is only 1 filter field in use
function _buildCriteria(filterBy) {
    // filterBy.hostId = '60fd09e0d6c8fcb17416507b'
    let criteria = {};
    if (filterBy.hostId){
        criteria['hostId'] = filterBy.hostId
    }
    return criteria
 }


