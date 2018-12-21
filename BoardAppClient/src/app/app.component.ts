import { BordGameService } from './services/bord-game.service';
import { Component } from '@angular/core';
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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  BoardGames: any;
  title = 'BoardAppClient';
  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private service: BordGameService, private store: Store<AppState>) { }

  ngOnInit() {
    // show spinner
    this.spinner.show();

    // Call Service to get all boardgames
    this.service.getBoardGames().subscribe(data => {
      this.BoardGames = Object.keys(data).map(function(key) {
        return data[key];
      });

      // Pass all boardgames into store
      for (let index = 0; index < this.BoardGames.length; index++) {
        this.store.dispatch(new boardgameActions.AddBoardGame(this.BoardGames[index]));

        // Add all players to player store
        if (this.BoardGames[index].Plays) {
          this.BoardGames[index].Plays.forEach(play => {
            if (play.Players && play.Players.length > 0) {
              play.Players.forEach(item => {
                const p: player = {Name: item};
                this.store.dispatch(new playerActions.AddPlayers(p));
              });
            }
          });
        }
      }

      // hide spinner
      this.spinner.hide();
    }, error => {
      let message = 'Error occured retriving data.';
      if (error.status === 0) {
        message = 'Unable to reach server.';
      }
      this.messageService.add({severity: 'error', summary: 'Error', detail: message});
      this.spinner.hide();
    });

  }
}
