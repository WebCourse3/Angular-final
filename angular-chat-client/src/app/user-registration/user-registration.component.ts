import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as io  from 'socket.io-client';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserRegistrationComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    this.socket = io('http://localhost:3000');
  }

  userName = '';
  socket = null;

  login() {
    if (this.userName !== null){
      sessionStorage.setItem("userName", this.userName);
      this._router.navigate(['rooms']);
    }
  }

  keypressHandler(event) {
    if (event.keyCode  === 13){
      this.login();
    }
  }

}
