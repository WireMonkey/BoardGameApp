import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { BordGameService } from '../services/bord-game.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  username: string = ""
  password: string = ""
  email: string = ""
  emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  validEmail: boolean = false;
  validUsername: boolean = false;
  validPassword: boolean = false;

  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private service: UserService,private boardGameService: BordGameService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  cancelButtonClick(event: any){
    this.username = "";
    this.password = "";
    this.service.createUser = false; 
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
    this.validPassword = this.password.length >= 8;
    return !this.validPassword;
  }

  createButtonClick(event: any) {
    this.spinner.show();
    this.service.saveUser(this.username,this.password,this.email).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account Created' });
      this.username = "";
      this.password = "";
      this.service.createUser = false;
      this.spinner.hide();
    }, error => {
      this.username = "";
      this.password = "";
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error creating user: " + error.error });
    });
  }
}
