import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = '';
  userId = '';
  validUser = false;
  createUser = false;
  
  constructor(private http: HttpClient) { 
    this.apiUrl = 'http://' + window.location.hostname + ':3000/users/';
  }

  loadUserFromStorage() {
    if(localStorage.getItem("boardgameToken")){
      this.validUser = true;
      this.userId = localStorage.getItem("boardgameToken");
      return true;
    }
    return false;
  }

  storeData() {
    if(this.validUser){
      localStorage.setItem("boardgameToken",this.userId);
    }
  }

  loginUser(userName: string, password: string) {
    let userData = {userName: userName, password: password};
    return this.http.post(this.apiUrl + "valid", userData);
  }

  saveUser(userName: string, password: string) {
    let userData = {userName: userName, password: password};
    return this.http.post(this.apiUrl, userData);
  }

  logoutUser() {
    this.validUser = false;
    this.userId = '';
    localStorage.removeItem("boardgameToken");
  }
}
