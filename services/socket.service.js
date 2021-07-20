

const spaceService =   require('./../api/space/space.service.js')
const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}
var gMsgHistory = [];

function connectSockets(http, session) {

    console.log('conecting sockets');
    gIo = require('socket.io')(http);

    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        console.log('New socket - socket.handshake.sessionID', socket.handshake.sessionID)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        // TODO: emitToUser feature - need to tested for CaJan21
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user._id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })
        socket.emit('chat-history', gMsgHistory)
        socket.on('chat topic', topic => {
            console.log('setting chat topic');
            if (socket.myTopic === topic) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            // logger.debug('Session ID is', socket.handshake.sessionID)
            socket.myTopic = topic
        })
        socket.on('chat newMsg', msg => {
            spaceService.addMsg(socket.myTopic, msg)
            // emits to all sockets:
            gIo.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            // gIo.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('typing', user => {
            console.log(user);
            socket.broadcast.emit('show-typer', user)
            // gIo.emit('show-typer', user)
        })

        socket.on('spaceView', msg => {
            console.log('someone is viewing this space');
            gIo.emit('viewingSpace')
        })


        socket.on('user-watch', userId => {
            socket.join(userId)
        })
    })
}
    
function emitToUser({ type, data, userId }) {
    gIo.to(userId).emit(type, data)
}

function emitToAll({ type, data, room = null }) {
    if (room) gIo.to(room).emit(type, data)
    else gIo.emit(type, data)
}


// Send to all sockets BUT not the current socket 
function broadcast({ type, data, room = null }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map')
    if (room) excludedSocket.broadcast.to(room).emit(type, data)
    else excludedSocket.broadcast.emit(type, data)
}


module.exports = {
    connectSockets,
    emitToAll,
    broadcast,
}



