import { Component, OnInit, Input } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model';
import { player } from './../models/player.model';
import * as boardgameActions from './../actions/boardgame.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-play-game-modal',
  templateUrl: './play-game-modal.component.html',
  styleUrls: ['./play-game-modal.component.css']
})
export class PlayGameModalComponent implements OnInit {
  @Input() boardGame: any;

  playerList: string[] = [];
  playGameDialogShow = false;
  player: any;
  players: string[] = [];
  filteredPlayers: any[];
  date1: Date = new Date();
  gameWinner: string;
  today: Date = new Date();
  notes: string;
  selectedExpansions: any[];
  expansions: string[] = [];

  playerStore: Observable<player[]>;
  storeList: player[];
  private oBoardgame: boardgame;

  constructor(private service: BordGameService, private store: Store<AppState>, private messageService: MessageService, private spinner: NgxSpinnerService) {
    this.playerStore = this.store.select('player');
  }

  ngOnInit() {
    this.playerStore.subscribe(store => {
      this.storeList = store;
    });

    this.oBoardgame = JSON.parse(JSON.stringify(this.boardGame));
  }

  PlayGame() {
    this.playGameDialogShow = true;
    this.oBoardgame = JSON.parse(JSON.stringify(this.boardGame));

    this.playerList = this.storeList.map(p => p.Name);
    this.expansions = this.boardGame.Expansions.map(e => ({label: e.Name, value: e.Name}));
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  filterPlayers(event) {
    this.filteredPlayers = [];
    for (let i = 0; i < this.playerList.length; i++) {
        const brand = this.playerList[i];
        if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredPlayers.push(brand);
        }
    }
  }

  autoCompleteKeyPress(event) {
    if ((event.keyCode === 188 || event.keyCode === 13) && (!this.isEmptyOrSpaces(this.player))) {
      this.players.push(this.player);
      this.player = '';
    }
  }

  addPlayer(event) {
    this.players.push(this.player);
    this.player = '';
  }

  hideModal() {
    this.playGameDialogShow = false;
    this.date1 = new Date;
    this.players = [];
    this.notes = '';
    this.player = '';
    this.gameWinner = '';
    this.selectedExpansions = [];
  }

  saveGamePlay(event: any) {
    //this.spinner.show();
    const gamePlay = {Date: this.date1, Players: this.players,
      Winner: this.gameWinner, Notes: this.notes, Expansions: this.selectedExpansions};
      this.boardGame.Plays.unshift(gamePlay);
      this.boardGame.Plays.sort(function(a, b) {
        if (moment(a.Date).isBefore(moment(b.Date))) {
          return 1;
        } else if (moment(a.Date).isAfter(moment(b.Date))) {
          return -1;
        } else {
          return 0;
        }
      });
      
      this.store.dispatch(new boardgameActions.PlayBoardGame(this.boardGame, this.oBoardgame));
      
      this.hideModal();
  }
}
