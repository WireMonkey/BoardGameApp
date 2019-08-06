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
  username: string;
  password: string;

  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private service: UserService,private boardGameService: BordGameService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  cancelButtonClick(event: any){
    this.username = "";
    this.password = "";
    this.service.createUser = false;
  }

  createButtonClick(event: any) {
    this.spinner.show();
    this.service.saveUser(this.username,this.password).subscribe(data => {
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
