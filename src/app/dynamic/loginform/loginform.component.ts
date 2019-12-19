import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  loginData = new Login(null, null, null);
  registerForm: FormGroup;
  submitted = false;
  result: any = {};

  constructor(private restaurantService: RestaurantService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      userType: ['user', Validators.required]

    });
  }


  get f() { return this.registerForm.controls; }

  login() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loginData.email = this.registerForm.get('email').value;
    this.loginData.password = this.registerForm.get('password').value;
    this.loginData.userType = this.registerForm.get('userType').value;


    this.restaurantService.login(this.loginData)
      .subscribe((result) => {
        this.result = JSON.parse(JSON.stringify(result));

        if (this.result.Status == "Success") {
          //storing login credentials in localstorge. token, userId , userType and userName
         this.restaurantService.setLocalStorage(this.result);



         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['restaurant']);
        });
       





        }
        else {
          alert(this.result.Status);
        }
      });


  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
