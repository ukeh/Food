import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/restaurant.service';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {


  file: File;
  registerForm: FormGroup;
  elements: any = {};
  flag: boolean;
  item: any = {};
  submitted = false;
  imgControl=false;
  constructor(@Inject(DOCUMENT) document, private restaurantService: RestaurantService, private router: Router, private formBuilder: FormBuilder, private local: LocalStorageService, private sanitizer: DomSanitizer) {

this.createForm();


   }

  ngOnInit() {

    // getLocalStorage() returns login credentials

    this.elements = this.restaurantService.getLocalStorage();
    if (this.elements.Token) {
      this.flag = this.local.get('flag');

     
      //flag is true for updateItem and false for addItem 

      if (this.flag) {
        let id = this.local.get('itemId');
     //   console.log("itemId    " + id)
        this.restaurantService.itemFetch(this.elements.userId, id, this.elements.Token)
          .subscribe((data) => {


            let result = JSON.parse(JSON.stringify(data));
            if (result.Status == "Error") {
              alert(result.Status);
            }
            else {

              this.item = result.item;

            //  console.log(this.item);
            this.imgControl=true;
              this.provideValue();
            }
          });

      }
     
      this.restaurantService.changeUserName(this.elements.name, "logout");

    }
    else {
      this.router.navigateByUrl("");
    }
  }


// For making header sticky while scrolling

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

  createForm() {
    this.registerForm = this.formBuilder.group({
      'itemName': new FormControl('', Validators.required),
      'itemImage': new FormControl(),
      'itemPrice': new FormControl('', Validators.required),
      'itemAvailability': new FormControl('Yes', Validators.required),
      'availableTime': new FormControl('', Validators.required),
    });

  }

// assigning selected item details choosen for updation

  provideValue(){
    this.registerForm.get('itemName').disable();
    this.registerForm.get('itemName').setValue(this.item.itemName);
this.registerForm.get('itemPrice').setValue(this.item.itemPrice);
this.registerForm.get('itemAvailability').setValue(this.item.itemAvailability);
this.registerForm.get('availableTime').setValue(this.item.availableTime);
  }


// Sanitizing base64 image string , must for angular 7

  transform(base64Image: any) {
  //  console.log(base64Image);
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }


//listening to file change , when selected multiple files taking the first one only

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];

    }
  }



// for adding item to the menu

  addItem() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let Status;
    if (!this.flag) {
      if (this.file) {

        //addItem part

        let formData: FormData = new FormData();
        formData.append('userId', this.elements.userId);
        formData.append('itemName', this.registerForm.get('itemName').value);
        formData.append('itemPrice', this.registerForm.get('itemPrice').value);
        formData.append('itemAvailability', this.registerForm.get('itemAvailability').value);
        formData.append('availableTime', this.registerForm.get('availableTime').value);
        formData.append('itemImage', this.file, this.file.type);

        this.restaurantService.addItem(formData, this.elements.Token)
          .subscribe((result) => {
            Status = JSON.parse(JSON.stringify(result)).Status;
            alert(Status);
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
              this.router.navigate(['show']);
            });
          });
      }
      else {
        alert("Choose a file");//if file is empty
      }
    }
    else {

      //updateItem part

      let itemPrice = this.registerForm.get('itemPrice').value;
      let itemAvailability = this.registerForm.get('itemAvailability').value;
      let availableTime = this.registerForm.get('availableTime').value;

      this.restaurantService.updateItem(this.elements.userId, itemPrice, itemAvailability, availableTime, this.elements.Token)
        .subscribe((result) => {
          Status = JSON.parse(JSON.stringify(result)).Status;
          alert(Status);
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this.router.navigate(['show']);
          });
        });
    }

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
