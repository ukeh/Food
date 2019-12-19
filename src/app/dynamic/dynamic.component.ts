import { Component, OnInit,HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {

 active:String="login";


  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {
  }
 
  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      let element = document.getElementById('navbar');
      element.classList.add('sticky');
    } else {
     let element = document.getElementById('navbar');
       element.classList.remove('sticky'); 
    }
 }



 activeChangedHandler(active:string){
  this.active=active;
 }


}
