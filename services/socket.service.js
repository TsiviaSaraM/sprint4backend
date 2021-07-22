

const spaceService =   require('./../api/space/space.service.js')
const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}
var gMsgHistory = [];
gSpaceViews = {}


function connectSockets(http, session) {
    console.log('conecting sockets');
    gIo = require('socket.io')(http);
    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        console.log('New socket - .sessionID & socketid', socket.handshake.sessionID, socket.id)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user._id)
        
        socket.on("connect", () => {
            console.log('socketid', socket.id); // ojIckSD2jqNzOqIrAGzL
          });

        socket.on('newViewer', spaceId => {
            //join the room
            console.log('setting chat topic', spaceId, socket.room1);
            if (socket.room1 === spaceId) return;
            if (socket.room1) {
                socket.leave(socket.room1)
            }
            socket.join(spaceId)
            console.log('setting chat topic', spaceId);

            //set spaceViews count
            if (gSpaceViews[spaceId]) gSpaceViews[spaceId] = gSpaceViews[spaceId] + 1
            else gSpaceViews[spaceId] = 1;
            gIo.emit('updateViewerCount', gSpaceViews[spaceId] + ' users are viewing this space', socket.id) 
            console.log('someone is viewing this space', gSpaceViews);

            //send socket id to host
            gIo.emit
        })
        socket.on('removeViewer', spaceId => {
            console.log('spaceId in remove********', spaceId);
            gSpaceViews[spaceId] = gSpaceViews[spaceId] - 1
            gIo.emit('updateViewerCount', gSpaceViews[spaceId] + ' users are viewing this space') 
            console.log('someone is leaving this space******', gSpaceViews[spaceId], gSpaceViews);
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })
        socket.on('joinSpacePreview', (spaceId) => {
            socket.join(spaceId)
            console.log('joined space', spaceId);
            console.log(socket.rooms);
        })
        socket.on('spaceLiked', spaceId => {
            console.log('spaceLiked', spaceId);
            console.log(socket.rooms[spaceId]);
            gIo.to(spaceId).emit('spaceLiked', spaceId)
        })
        socket.on('spaceBooked', spaceId => {
            console.log('spaceBooked', spaceId);
            console.log(socket.rooms[spaceId]);
            gIo.to(spaceId).emit('spaceBooked', spaceId)
        })

        socket.on('joinChat', (socketId = null) => {
            if (!socketId) socketId = socket.id
            socket.join(socketId)
            socket.emit('socketId', socketId)
        })

        socket.on('send-msg', msg => {
            console.log('received msg in socket:', socket.id);
            gIo.emit('receive-msg',msg)
        })

        socket.on('newOrder', socket => {
            socket.emit('newOrder', )
        })
        socket.on('disconnect', socket => {
            console.log('Someone disconnected', socket)
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })
        // socket.emit('chat-history', gMsgHistory)
        socket.on('chat topic', spaceId => {
            console.log('setting chat topic', spaceId);
            if (socket.myTopic === spaceId) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(spaceId)
            // logger.debug('Session ID is', socket.handshake.sessionID)
            socket.myTopic = spaceId

            //set spaceViews count
            if (gSpaceViews[spaceId]) gSpaceViews[spaceId] = gSpaceViews[spaceId] + 1
            else gSpaceViews[spaceId] = 1;
            gIo.emit('viewingSpace', gSpaceViews[spaceId]) //TODO remove this for details page
            console.log('someone is viewing this space', gSpaceViews[spaceId], gSpaceViews);
        })
        socket.on('chat newMsg', msg => {
            // emits to all sockets:
            gIo.emit('chat addMsg', msg)

            // emits only to sockets in the same room
            // gIo.to(socket.myTopic).emit('chat addMsg', msg)

            socket.broadcast.emit('show-typer', 'user', socket.myTopic)
        })
        socket.on('typing', user => {
            console.log(user);
            socket.broadcast.emit('show-typer', user)
            // gIo.emit('show-typer', user)
        })
        socket.on('user-watch', userId => {
            socket.join(userId)
        })
        socket.on('joinChat', function (data) {
            socket.join(data.user); // We are using room of socket io
          });
          gIo.sockets.in('user1@example.com').emit('new_msg', {msg: 'hello'});
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



