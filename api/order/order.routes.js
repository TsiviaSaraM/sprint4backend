const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addOrder, getOrder, getOrders, deleteOrder, updateOrder} = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

//ququ how do I add filter here
router.get('/', getOrders)
router.get('/:id', getOrder)
// router.put('/:id', requireAuth,  updateOrder)
router.put('/:id', updateOrder)
// router.post('/', requireAuth,  addOrder)
router.post('/', addOrder)
// router.post('/:id/review', addReview)
// router.put('/:id',  requireAuth, updateOrder)
// router.delete('/:id',  requireAuth, requireAdmin, deleteOrder)
router.delete('/:id', deleteOrder)

module.exports = router