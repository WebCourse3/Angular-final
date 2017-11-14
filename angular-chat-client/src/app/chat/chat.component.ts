import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SocketsService } from '../sockets.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  message = '';
  conversation = [];
  roomName = null;
  constructor(private _router: Router, private _sockets:SocketsService){}

  ngOnInit() {
    if (sessionStorage.getItem("userName") === null){
      this._router.navigate(['registration']);
    }
    this._sockets.socket.on('chatUpdate', function(data) {

      if (data.text[0] === '@'){
        var name = data.text.substr(1, data.text.indexOf(" "));

        if (sessionStorage.getItem("userName") === name){
          //Materialize.toast('I am a toast!', 3000, 'rounded');
        }
      }

      this.conversation.push(data);
    }.bind(this));

    this.roomName = sessionStorage.getItem("roomName");
  }

  send() {
    this._sockets.newMessage(sessionStorage.getItem("userName"),
                             sessionStorage.getItem("roomName"),
                             this.message)
    this.message = '';
  }

  keypressHandler(event) {
    if (event.keyCode === 13){
      this.send();
    }
  }

  isMineMessage(data){
    return data.userName === sessionStorage.getItem("userName");
  }

  isNewUserAlert(data){
    return data.userName === '';
  }

  navToRooms() {
    this._router.navigate(['rooms']);
  }
}
