import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BordGameService } from '../services/bord-game.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as boardgameActions from './../actions/boardgame.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service: UserService,private boardgameService: BordGameService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  logoutButtonClicked(event: any) {
    this.service.validUser = false;
    this.service.userId = '';
    this.store.dispatch(new boardgameActions.ClearBoardGame());
  }
}
