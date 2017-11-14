var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
  socket.on('leaveRoom', function (data) {
    socket.to(data.roomName).emit('chatUpdate', {'userName':'','text':data.userName+' has left the room'});
    socket.leave(data.roomName);
  });
  socket.on('joinRoom', function (data) {
    socket.join(data.roomName);
    socket.to(data.roomName).emit('chatUpdate',
      {'userName':'','text':data.userName+' has joined the room'});
  });
  socket.on('newMessage',function (data) {
    var dataWithoutRoom = {'userName':data.userName,'text':data.text, 'msgDate':data.msgDate}
    io.in(data.roomName).emit('chatUpdate',dataWithoutRoom);
  });
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
