const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addSpace, getSpace, getSpaces, deleteSpace, updateSpace} = require('./space.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getSpaces)
router.get('/:id', getSpace)
// router.put('/:id', requireAuth,  updateSpace)
router.put('/:id', updateSpace)
// router.post('/', requireAuth,  addSpace)
router.post('/', addSpace)
// router.post('/:id/review', addReview)
// router.put('/:id',  requireAuth, updateSpace)
// router.delete('/:id',  requireAuth, requireAdmin, deleteSpace)
router.delete('/:id', deleteSpace)
// router.get('/host/:hostId', getSpaceByHost)

module.exports = router