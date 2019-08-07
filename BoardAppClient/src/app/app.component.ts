import { BordGameService } from './services/bord-game.service';
import { Component, HostListener } from '@angular/core';
import { BoardGameGridComponent } from './board-game-grid/board-game-grid.component';
import { RefreshDataComponent } from './refresh-data/refresh-data.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { boardgame } from './models/boardgames.model';
import { player } from './models/player.model';
import * as boardgameActions from './actions/boardgame.actions';
import * as playerActions from './actions/player.actions';
import { Observable } from 'rxjs';
import {MessageService} from 'primeng/api';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BoardAppClient';
  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private service: BordGameService, private store: Store<AppState>, private userService: UserService) { }

  ngOnInit() {
    if(this.userService.loadUserFromStorage()){
      this.store.dispatch(new boardgameActions.LoadBoardGames());
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler($event) {
     this.userService.storeData();
  }
}
