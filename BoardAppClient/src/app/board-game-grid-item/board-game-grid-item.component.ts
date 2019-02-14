import { Component, OnInit, Input } from '@angular/core';
import { boardgame } from '../models/boardgames.model';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { BordGameService } from '../services/bord-game.service';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as boardgameActions from './../actions/boardgame.actions';

@Component({
  selector: 'app-board-game-grid-item',
  templateUrl: './board-game-grid-item.component.html',
  styleUrls: ['./board-game-grid-item.component.css']
})
export class BoardGameGridItemComponent implements OnInit {
  @Input() boardGame: boardgame;
  constructor(private messageService: MessageService, private service: BordGameService, private spinner: NgxSpinnerService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  formatDate(date: Date) {
    const formatDate = moment(date);
    return formatDate.format('MMM Do YYYY');
  }

  formatPlayerList(list: string[]) {
    try {
      return list.join(', ');
    } catch (error) {
      return '';
    }
  }

  formatExpansionList(list: any[]) {
    try {
      return list.map(x => x.Name).join(', ');
    } catch (error) {
      return '';
    }
  }

  removePlayedGame(event: any, play: any) {

    const orig = JSON.parse(JSON.stringify(this.boardGame));
    this.boardGame.Plays = this.boardGame.Plays.filter(p => p !== play);

    this.store.dispatch(new boardgameActions.UpdateBoardGame(this.boardGame, orig));
  }
}
