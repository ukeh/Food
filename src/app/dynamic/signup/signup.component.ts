import { Component, OnInit,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output() activeChanged: EventEmitter<String>=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  signup(){
    this.activeChanged.emit("signup");
  }


}
