import { Injectable } from '@angular/core';
import * as io  from 'socket.io-client';

@Injectable()
export class SocketsService {
  socket = null;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  public joinRoom(roomName, userName){
    this.socket.emit('joinRoom', { roomName:roomName, userName:userName});
  }

  public leaveRoom(roomName, userName){
    this.socket.emit('leaveRoom', { roomName:roomName, userName:userName});
  }

  public newMessage(userName, roomName, message){
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();


    this.socket.emit('newMessage', {
      'userName': userName,
      'text': message,
      'roomName': roomName,
      'msgDate' : datetime
    });
  }

  public newUser(userName){
    this.socket.emit('newUser', userName);
  }

}
