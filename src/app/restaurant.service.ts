import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  elements: any = {};
  searchResult: any = {};


  constructor(private http: HttpClient, public local: LocalStorageService) { }

  private userName = new BehaviorSubject('');
  private logOut = new BehaviorSubject('');
  currentUserName = this.userName.asObservable();
  logOutStatus = this.logOut.asObservable();


  changeUserName(name: string, logout: string) {
    this.userName.next(name);
    this.logOut.next(logout);
  }



  register(registerData) {
    return this.http.post("http://localhost:3000/registerUser", registerData);
  }



  signup(signupData) {
    return this.http.post("http://localhost:3000/signupUser", signupData);
  }


  login(loginData) {
    return this.http.post("http://localhost:3000/login", loginData);
  }

  search(searchData, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/search", searchData, options);
  }

  restaurant(userId, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant", { userId }, options);
  }


  showRestaurant(userId, Token, id) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/showrestaurant", { userId: userId, id: id }, options);
  }


  deleteUser(userId, ownerId, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/delete", { userId: userId, ownerId: ownerId }, options);
  }


  infoUser(userId, ownerId, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/more", { userId: userId, ownerId: ownerId }, options);
  }

  deleteItem(userId, itemId, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/deleteItem", { userId: userId, itemId: itemId }, options);
  }



  feedback(userId, resId, userCount, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/feedback", { userId: userId, resId: resId, userCount: userCount }, options);
  }




  updateRegister(userId, registerData, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/more/update", { register: registerData, userId: userId }, options);
  }


  updateItem(UserId, price, availability, time, Token) {
    let options = this.createHeaders(Token);
    let itemId = this.local.get('itemId')
    return this.http.post("http://localhost:3000/restaurant/editItem", { userId: UserId, itemPrice: price, itemAvailability: availability, availableTime: time, itemId: itemId }, options);
  }

  addItem(menu, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/addItem", menu, options);
  }

  uploadImage(picture, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/image", picture, options);
  }




  itemFetch(userId, itemId, Token) {
    let options = this.createHeaders(Token);
    return this.http.post("http://localhost:3000/restaurant/itemFetch", { userId: userId, itemId: itemId }, options);
  }





  createHeaders(Token) {
    let headers = new HttpHeaders({
      'contetnt-Type': 'application/json',
      'Authorization': "Token " + Token
    });
    let options = { headers: headers }
    return options;
  }



  public getLocalStorage() {
    this.elements.Token = this.local.get("Token");
    this.elements.userId = this.local.get("userId");
    this.elements.name = this.local.get("name");
    this.elements.userType = this.local.get("userType");
    return this.elements;
  }

  public setLocalStorage(elements) {
    this.local.set("Token", elements.Token);
    this.local.set("userId", elements.userId);
    this.local.set("name", elements.name);
    this.local.set("userType", elements.userType);
  }

  public clearLocalStorage() {
    this.local.clear();
    this.elements = {};
    this.searchResult = {};
  }




  getDataPresent() {
    return this.searchResult;
  }
  setDataPresent(data, count,totalDocs,searchKey,fieldType,forwardMove,backwardMove) {
    this.searchResult.restaurants = data;
    this.searchResult.count = count;
    this.searchResult.totalDocs=totalDocs;
    this.searchResult.searchKey=searchKey;
    this.searchResult.fieldType=fieldType;
    this.searchResult.forwardMove=forwardMove;
    this.searchResult.backwardMove=backwardMove;
  }



}
