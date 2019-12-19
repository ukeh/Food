import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Register } from './register.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/restaurant.service'


@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css']
})
export class RegisterformComponent implements OnInit {
  registerData = new Register(null, null, null, null, null, null, null, null, null, null);
  registerForm: FormGroup;
  submitted = false;
  Status:String;
  @Output() activeChanged: EventEmitter<String>=new EventEmitter();
  constructor(private restaurantService: RestaurantService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      restaurantName: ['', [Validators.required, Validators.minLength(3)]],
      registrationId: ['', Validators.required],
      address: ['', Validators.required],
      district: ['', Validators.required],
      ownerName: ['', [Validators.required, Validators.minLength(3)]],
      contactNumber: ['', [Validators.required,Validators.pattern('[6-9]\\d{9}') ]],
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(3)]]
    }, { validator: ConfirmPasswordValidator.MatchPassword });

  }
  get f() { return this.registerForm.controls; }

  register(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.registerData.restaurantName=this.registerForm.get('restaurantName').value;
    this.registerData.registrationId=this.registerForm.get('registrationId').value;
    this.registerData.address=this.registerForm.get('address').value;
    this.registerData.district=this.registerForm.get('district').value;
    this.registerData.ownerName=this.registerForm.get('ownerName').value;
    this.registerData.contactNumber=this.registerForm.get('contactNumber').value;
    this.registerData.email=this.registerForm.get('email').value;
    this.registerData.password=this.registerForm.get('password').value;
    this.registerData.location=this.registerForm.get('location').value;
    this.registerData.userType="restaurant";
    
    this.restaurantService.register(this.registerData)
    .subscribe((result)=>{
      this.Status=JSON.parse(JSON.stringify(result)).Status;

      if(this.Status=="Success"){
        alert("Success");
       this.activeChanged.emit("login");
      }
      else{
        alert(this.Status);
      }
    });

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
