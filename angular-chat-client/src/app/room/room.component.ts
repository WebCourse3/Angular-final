import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import * as io  from 'socket.io-client';

@Component({
  selector: 'app-rooms',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoomsComponent implements OnInit {
  socket = null;
  private rooms = [
    { name:'room1', users:[]},
    { name:'room2', users:[]},
    { name:'room3', users:[]}
  ];

  constructor(private _router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem("userName") === null){
      this._router.navigate(['registration']);
    }
    this.socket = io('http://localhost:3000');
  }

  chooseRoom(room){
    let userName = sessionStorage.getItem("userName");
    let oldRoomName = sessionStorage.getItem("roomName");
    if (oldRoomName){
      this.socket.emit('leaveOldRoom');
    }
    sessionStorage.setItem("roomName", room.name);
    //room.users.push(userName);
    this._router.navigate(['chat']);
    this.socket.emit('joinRoom', room.name)
    this.socket.emit('newUser', userName);
  }
}
