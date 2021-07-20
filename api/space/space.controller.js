const spaceService = require('./space.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getSpace(req, res) {
    try {
        const space = await spaceService.getById(req.params.id)
        res.send(space)
    } catch (err) {
        logger.error('Failed to get space', err)
        res.status(500).send({ err: 'Failed to get space' })
    }
}

async function getSpaces(req, res) {
    try {
        const filterBy = req.query;
        const spaces = await spaceService.query(filterBy)
        res.send(spaces)
    } catch (err) {
        logger.error('Failed to get spaces', err)
        res.status(500).send({ err: 'Failed to get spaces' })
    }
}

// async function getSpaceByHost(req,res){

//     hostId = 'u101'
//     const filterBy = {
//         hostId: "u101"
//     }
//     try{
//         const spaces = await spaceService.query(filterBy)
//         res.send(spaces)
//     } catch (err) {
//         console.log('getSpacesForHost', err);
//         throw err;
//     }
// }

async function deleteSpace(req, res) {
    try {
        await spaceService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete space', err)
        res.status(500).send({ err: 'Failed to delete space' })
    }
}

async function updateSpace(req, res) {
    try {
        const space = req.body
        const savedSpace = await spaceService.update(space)
        res.send(savedSpace)
        // socketService.broadcast({type: 'space-updated', data: space, to:savedSpace._id})
        // return savedSpace
    } catch (err) {
        logger.error('Failed to update space', err)
        res.status(500).send({ err: 'Failed to update space' })
    }
}


async function addSpace(req, res) {
    try {
        const space = req.body
        const savedSpace = await spaceService.add(space)
        res.send(savedSpace)
        // socketService.broadcast({type: 'space-updated', data: space, to:savedSpace._id})
    } catch (err) {
        logger.error('Failed to update space', err)
        res.status(500).send({ err: 'Failed to update space' })
    }
}

async function addReview(){
    try {
        var review = req.body
        review.byUserId = req.session.user._id
        review = await spaceService.addReview(review)
        
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
    getSpace,
    getSpaces,
    deleteSpace,
    updateSpace,
    addSpace,
    addReview,
    
}