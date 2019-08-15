import { Component, HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { BordGameService } from './services/bord-game.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { UserService } from './services/user.service';
import * as boardgameActions from './actions/boardgame.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BoardAppClient';
  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private service: BordGameService, private store: Store<AppState>, public userService: UserService) { }

  ngOnInit() {
    if(this.userService.loadUserFromStorage()){
      this.spinner.show();
      this.userService.refreshToken().toPromise().then(result => {
        this.userService.validUser = true;
        this.userService.userId = result.toString();
        this.store.dispatch(new boardgameActions.LoadBoardGames());

        this.userService.loadUserdata();
      }).catch(error => {
        this.spinner.hide();
      });
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
     this.userService.storeData();
  }
}
