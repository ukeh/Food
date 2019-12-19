import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/restaurant.service';
import { Register } from '../dynamic/registerform/register.model';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  elements: any = {};
  count: Number;
  owner: Register;
  submitted:boolean=false;
  addForm:FormGroup;
  constructor(@Inject(DOCUMENT) document, private restaurantService: RestaurantService, private router: Router, private formBuilder: FormBuilder, private local: LocalStorageService) {
    this.createForm();
   }

  ngOnInit() {
    this.elements = this.restaurantService.getLocalStorage();

    //login credential for admin

    if (this.elements.Token) {
       
    // infoid, id used by admin to edit restaurants account 
      let local = this.local.get('infoid');
    
     // console.log(local);
      //getting  info from server

      this.restaurantService.infoUser(this.elements.userId, local, this.elements.Token)
        .subscribe((data) => {
          let result = JSON.parse(JSON.stringify(data));
          if (result.Status == "Error") {
            alert(result.Status);
          }
          else {
            this.owner = result.ownerData;
            console.log(this.owner);
            this.provideValue();
          }
        });
        this.restaurantService.changeUserName(this.elements.name,"logout");
        // document.getElementById('logout').innerHTML = 'logout';
        // document.getElementById('headuser').innerHTML = this.elements.name;
    }
    else {
      this.router.navigateByUrl("");
    }
  }


  //sticky header

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    if (window.pageYOffset > 20) {
      let element = document.getElementById('navbar');
      element.classList.add('sticky');
    } else {
      let element = document.getElementById('navbar');
      element.classList.remove('sticky');
    }
  }

  get f() { return this.addForm.controls; }





createForm(){
  this.addForm  = this.formBuilder.group({
    restaurantName:['',[Validators.required,Validators.minLength(3)]],
    registrationId: ['', Validators.required],
    address: ['', Validators.required],
    district: ['', Validators.required],
    ownerName: ['', [Validators.required, Validators.minLength(3)]],
    contactNumber: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
    email:[''],
    password: [''],
    location: ['', [Validators.required, Validators.minLength(3)]]
  });
}

provideValue(){

this.addForm.get('restaurantName').setValue(this.owner.restaurantName);
this.addForm.get('registrationId').setValue(this.owner.registrationId);
this.addForm.get('address').setValue(this.owner.address);
this.addForm.get('district').setValue(this.owner.district);
this.addForm.get('ownerName').setValue(this.owner.ownerName);
this.addForm.get('contactNumber').setValue(this.owner.contactNumber);
this.addForm.get('email').disable();
this.addForm.get('email').setValue(this.owner.email);
this.addForm.get('location').setValue(this.owner.location);
}


//for submitting updated details, here new password only needed to provide if accounts holder wants to reset his password, requested to admin.

  update() {
    this.submitted=true;
    if (this.addForm.invalid) {
      return;
    }
    this.owner.restaurantName = this.addForm.get('restaurantName').value;
    this.owner.registrationId = this.addForm.get('registrationId').value;
    this.owner.address = this.addForm.get('address').value;
    this.owner.district = this.addForm.get('district').value;
    this.owner.ownerName = this.addForm.get('ownerName').value;
    this.owner.contactNumber = this.addForm.get('contactNumber').value;
    this.owner.email = this.addForm.get('email').value;
    this.owner.password = this.addForm.get('password').value;
    this.owner.location = this.addForm.get('location').value;
    this.owner.userType = "restaurant";

    this.restaurantService.updateRegister(this.elements.userId, this.owner, this.elements.Token)
      .subscribe((result) => {
        let Status = JSON.parse(JSON.stringify(result)).Status;

        if (Status == "Success") {
          alert("Success");
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this.router.navigate(['show']);
          });
        }
        else {
          alert(Status);
        }
      });
  }
}
