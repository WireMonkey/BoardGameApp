import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  editUserShow: boolean = false;
  validEmail: boolean = false;
  validUsername: boolean = false;
  validPassword: boolean = false;

  username: string = ""
  password: string = ""
  email: string = ""
  emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  qrCode: string = "";

  constructor(private userService: UserService,private messageService: MessageService, private spinner: NgxSpinnerService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  showModal() {
    this.username = this.userService.userInfo.userName;
    this.email = this.userService.userInfo.email;
    this.password = "";
    this.editUserShow = true;

    const qrData = window.btoa(JSON.stringify({userName: this.username, id: Math.floor(Math.random() * 30000 + 1)})); 
    this.qrCode =  environment.qrUrl + 'collection/' + qrData;
  }

  saveButtonClicked(){
    this.spinner.show();
    this.userService.updateUser(this.username,this.password,this.email).subscribe(result => {
      this.spinner.hide();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account changes saved.' });
      this.userService.userInfo.userName = this.username;
      this.userService.userInfo.email = this.email;
      this.editUserShow = false;
    },error => {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error saving changes."});
    })
    
  }

  validateUsername() {
    this.validUsername = this.username.length > 0;
    return !this.validUsername;
  }

  validateEmail() {
    this.validEmail = this.emailReg.test(this.email);
    return !this.validEmail;
  }

  validatePassword() {
    this.validPassword = this.password.length >= 8 || this.password.length <= 0;
    return !this.validPassword;
  }

  downloadJson() {
    this.spinner.show();
    this.store.select('boardgame').subscribe(items => {
      const bJson = JSON.stringify(items);
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(bJson);
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "boardgames.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      this.spinner.hide();
    });
  }

}
