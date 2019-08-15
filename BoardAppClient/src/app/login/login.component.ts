import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { BordGameService } from '../services/bord-game.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as boardgameActions from '../actions/boardgame.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private service: UserService,private boardGameService: BordGameService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  loginButtonClick(event: any) {
    this.service.loginUser(this.username,this.password).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Login successfull', detail: 'Welcome ' + this.username });
      this.service.validUser = true;
      this.service.userId = data.toString();
      this.store.dispatch(new boardgameActions.LoadBoardGames());
      this.service.loadUserdata();
      this.username = "";
      this.password = "";
    }, error => {
      this.username = "";
      this.password = "";
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Invalid username or password." });
    });
  }

  createButtonClick(event: any) {
    this.service.createUser = true;
  }

}
