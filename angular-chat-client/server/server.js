var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var commands = [
	{command: '/setColor', style: 'color: '},
	{command: '/setBold' , style: 'font-weight: bold'},
	{command: '/setItalic' , style: 'font-style: italic;'}
];

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res){
// 	res.sendFile(__dirname + '/public/views/index.html');
// });

io.on('connection', function (socket) {         // line 12
  socket.on('newMessage', function (data) {
    socket.emit('chatUpdate',data);
    socket.broadcast.emit('chatUpdate',data);
  });
  socket.on('newUser', function (data) {
    socket.emit('chatUpdate',
      {'userName':'','text':data+' has entered the room'});
    socket.broadcast.emit('chatUpdate',
      {'userName':'','text':data+' has entered the room'});
  });
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
