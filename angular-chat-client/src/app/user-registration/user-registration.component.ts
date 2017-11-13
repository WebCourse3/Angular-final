import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserRegistrationComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    this.socket = io('http://localhost:8000');
  }

  userName = '';
  socket = null;

  login() {
    if (this.userName !== null){
      sessionStorage.setItem("userName", this.userName);
      this._router.navigate(['Chat']);
      this.socket.emit('newUser', this.userName);
    }
  }

  keypressHandler(event) {
    if (event.keyCode  === 13){
      this.login();
    }
  }

}
