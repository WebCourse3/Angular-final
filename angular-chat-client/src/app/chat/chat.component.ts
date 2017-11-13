import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as io  from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  message = '';
  conversation = [];
  socket = null;

  constructor(
    private _router: Router){}

  ngOnInit() {
    if (sessionStorage.getItem("userName") === null){
      this._router.navigate(['registration']);
    }
    this.socket = io('http://localhost:3000');
    this.socket.on('chatUpdate', function(data) {
      this.conversation.push(data);
    }.bind(this));
  }

  send() {
    this.socket.emit('newMessage', {
      'userName': sessionStorage.getItem("userName"),
      'text': this.message
    });
    this.message = '';
  }

  keypressHandler(event) {
    if (event.keyCode === 13){
      this.send();
    }
  }

  isNewUserAlert(data){
    return data.userName === '';
  }
}
