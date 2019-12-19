import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Signup } from './signup.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../registerform/confirm-password.validator';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/restaurant.service';


@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {


  signupData = new Signup(null, null, null, null);
  registerForm: FormGroup;
  submitted = false;
  Status: String;


  @Output() activeChanged: EventEmitter<String>=new EventEmitter();

  constructor(private restaurantService: RestaurantService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {


    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validator: ConfirmPasswordValidator.MatchPassword });

  }


  get f() { return this.registerForm.controls; }

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
   
    this.signupData.userName = this.registerForm.get('userName').value;
    this.signupData.email = this.registerForm.get('email').value;
    this.signupData.password = this.registerForm.get('password').value;
    this.signupData.userType = "user";


    this.restaurantService.signup(this.signupData)
      .subscribe((result) => {
        this.Status = JSON.parse(JSON.stringify(result)).Status;

        if (this.Status == "Success") {
          alert("Success");
        this.activeChanged.emit("login");
        }
        else {
          alert(this.Status);
        }
      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
