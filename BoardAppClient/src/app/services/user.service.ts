import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = '';
  userId = '';
  validUser = false;
  createUser = false;
  userInfo: any;
  
  constructor(private http: HttpClient) { 
    this.apiUrl = 'http://' + window.location.hostname + ':4200/api/users/';
    //this.apiUrl = 'http://' + window.location.hostname + ':3000/users/';
  }

  loadUserFromStorage() {
    if(localStorage.getItem("boardgameToken")){
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

  saveUser(userName: string, password: string, email: string) {
    let userData = {userName: userName, password: password, email: email};
    return this.http.post(this.apiUrl, userData);
  }

  updateUser(userName: string, password: string, email: string) {
    let userData = {userName: userName, email: email, password: null};
    if (password && password.length > 0){
      userData.password = password;
    }
    return this.http.patch(this.apiUrl,userData);
  }

  resetPassword(refreshToken: string, password: string) {
    let resetData = {resetHash: refreshToken, password: password};
    return this.http.post(this.apiUrl + "reset", resetData);
  }

  sendResetEmail(email: string) {
    let resetData = {email: email};
    return this.http.post(this.apiUrl + "setReset", resetData);
  }

  logoutUser() {
    this.validUser = false;
    this.userId = '';
    localStorage.removeItem("boardgameToken");
  }

  refreshToken() {
    return this.http.get(this.apiUrl + "refresh");
  }

  loadUserdata() {
    this.http.get(this.apiUrl).subscribe(result => {
      this.userInfo = result;
    })
  }
}
