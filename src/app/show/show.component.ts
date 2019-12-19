import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/restaurant.service';
import { Restaurant } from '../restaurant/restaurant.model';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document, private restaurantService: RestaurantService, private router: Router, private formBuilder: FormBuilder, private local: LocalStorageService,private sanitizer: DomSanitizer) { }

  registerForm: FormGroup;

  submitted = false;
  searchData: any = {};
  elements: any = {};
  count: Number;
  restaurant = new Restaurant(null, null, null, null, null, null, null,null,null);
  flag: boolean = false;
  value;
  fileData: File = null;
  max=5;

  ngOnInit() {
    this.elements = this.restaurantService.getLocalStorage();
    if (this.elements.Token) {

      // id is selected restaurant's id

      let local = this.local.get('id');
      console.log(local);
      this.restaurantService.showRestaurant(this.elements.userId, this.elements.Token, local)
        .subscribe((data) => {
          let result = JSON.parse(JSON.stringify(data));
          console.log(result.restaurant);
          if (result.Status == "Error") {
            alert(result.Status);
          }
          else {
           // console.log("DAata   "+result.restaurant.items[0]._id);
            this.restaurant = result.restaurant;
          }
        });

      this.registerForm = this.formBuilder.group({
        picture: ['', Validators.required]
      });

      //displaying username on header
      this.restaurantService.changeUserName(this.elements.name,"logout");
      
    }
    else {
      this.router.navigateByUrl("");
    }
  }

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

//sanitizer

  transform(base64Image:any) {
    console.log(base64Image);
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }


// updating restaurants image

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('picture', file,file.type);
      formData.append('userId',this.elements.userId);
      this.restaurantService.uploadImage(formData, this.elements.Token)
        .subscribe((result) => {
          alert(JSON.parse(JSON.stringify(result)).Status);
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this.router.navigate(['show']);
          });
        })

    }
  }

//hide or show item image

  buttonClick() {
    this.flag = !this.flag;
  }


  //for admin for deleting an account

  deleteUser(id) {
    this.restaurantService.deleteUser(this.elements.userId, id, this.elements.Token)
      .subscribe((result) => {
        let Status = JSON.parse(JSON.stringify(result)).Status;
        if (Status == "Success") {
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this.router.navigate(['restaurant'])
          });
        }
        else {
          alert(Status);
        }
      })
  }


  // 

  infoUser(ownerId) {
    this.local.remove('infoid');
    this.local.set('infoid', ownerId);
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['info']);
    });   
  }


  deleteItem(itemId) {
    this.restaurantService.deleteItem(this.elements.userId, itemId, this.elements.Token)
      .subscribe((result) => {
        if (JSON.parse(JSON.stringify(result)).Status == "Success") {
          this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this.router.navigate(['show']);
          });
        }
        else {
          alert("Error");
        }
      });
  }

  editItem(id, flag) {
    this.local.remove('itemId');
    this.local.set('itemId', id);
    this.local.remove('flag');
    this.local.set('flag', flag);
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['additem']);
    });
  }

  feedback(restaurant) {
    this.restaurantService.feedback(this.elements.userId, restaurant._id, this.value, this.elements.Token)
      .subscribe((result) => {
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this.router.navigate(['show']);
      });
   
    });
  }
  addItem(flag) {
    this.local.remove('flag');
    this.local.set('flag', flag);
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['additem']);
    });
  }



}
