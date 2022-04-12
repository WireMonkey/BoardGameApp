import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '';
  userId = '';
  validUser = false;
  readonly = false;
  createUser = false;
  userInfo: any;
  
  constructor(private http: HttpClient) { 
    this.apiUrl = environment.Url + 'api/users/';
  } 

  loadUserFromStorage() {
    if(localStorage.getItem("boardgameToken")){
      this.userId = localStorage.getItem("boardgameToken");
      return true;
    }
    return false;
  }

  storeData() {
    if(this.validUser && !this.readonly){
      localStorage.setItem("boardgameToken",this.userId);
    }
  }

  loginUser(userName: string, password: string) {
    let userData = {userName: userName, password: password};
    return this.http.post(this.apiUrl + "valid", userData);
  }

  loginReadOnly(userName: string, id: string) {
    let userData = {userName: userName, id: id};
    return this.http.post(this.apiUrl + "validReadOnly", userData);
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
