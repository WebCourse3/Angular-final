import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SocketsService } from '../sockets.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoomsComponent implements OnInit {
  socket = null;
  private rooms = [
    { name:'Cool guys room'},
    { name:'Room of the kings'},
    { name:'Some lame room'}
  ];

  constructor(private _router: Router, private _sockets: SocketsService) { }

  ngOnInit() {
    if (sessionStorage.getItem("userName") === null){
      this._router.navigate(['registration']);
    }
  }

  chooseRoom(room){
    let oldRoomName = sessionStorage.getItem("roomName");
    if (oldRoomName){
      this._sockets.leaveRoom(oldRoomName, sessionStorage.getItem("userName"));
    }

    this._sockets.joinRoom(room.name, sessionStorage.getItem("userName"));
    sessionStorage.setItem("roomName", room.name);
    this._router.navigate(['chat']);
  }
}
