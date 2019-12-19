import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {AngularWebStorageModule} from 'angular-web-storage';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { RegisterformComponent } from './dynamic/registerform/registerform.component';
import { LoginformComponent } from './dynamic/loginform/loginform.component';
import { SignupformComponent } from './dynamic/signupform/signupform.component';
import { SignupComponent } from './dynamic/signup/signup.component';
import { LoginComponent } from './dynamic/login/login.component';
import { RegisterComponent } from './dynamic/register/register.component';
import { ContactComponent } from './contact/contact.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import {RatingModule} from 'ngx-bootstrap';
import { ShowComponent } from './show/show.component';
import { AdditemComponent } from './additem/additem.component';
import { DetailsComponent } from './details/details.component';
//import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DynamicComponent,
    RegisterformComponent,
    LoginformComponent,
    SignupformComponent,
    SignupComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    RestaurantComponent,
    ShowComponent,
    AdditemComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularWebStorageModule,
    



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
