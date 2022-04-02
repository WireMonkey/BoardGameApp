import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as boardgameActions from '../actions/boardgame.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(public userService: UserService, public activatedRoute: ActivatedRoute, private messageService: MessageService,private store: Store<AppState>) { }
  
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const sCode = this.activatedRoute.snapshot.params.code;
    if(sCode){
      const code = JSON.parse(window.atob(sCode));
      if(code.userName && code.id) {
        this.userService.loginReadOnly(code.userName,code.id).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Login successfull', detail: 'Viewing ' + code.userName });
          this.userService.validUser = true;
          this.userService.readonly = true;
          this.userService.userId = data.toString();
          this.store.dispatch(new boardgameActions.LoadBoardGames());
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Invalid code provided" });
        });
      }
    }
  }

}
