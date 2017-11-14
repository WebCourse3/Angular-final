var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
  socket.on('leaveOldRoom', function (room) {
    socket.leave(room);
  });
  socket.on('joinRoom', function (room) {
    socket.join(room);
  });
  socket.on('newMessage',function (data) {
    socket.to(data.roomName).emit('chatUpdate',data.slice(2));
    socket.to(data.roomName).broadcast.emit('chatUpdate',data.slice(2));
  });
  socket.on('newUser', function (data) {
    socket.broadcast.emit('chatUpdate',
       {'userName':'','text':data+' has entered the room'});
  });
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
