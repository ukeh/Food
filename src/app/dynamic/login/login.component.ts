import { Component, OnInit, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  @Output() activeChanged: EventEmitter<String> = new EventEmitter();

// for handling form display

  login() {
    this.activeChanged.emit("login");
  }
}
