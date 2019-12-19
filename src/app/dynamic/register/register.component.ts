import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() activeChanged: EventEmitter<String>=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  register(){
    this.activeChanged.emit("register");
  }
}
