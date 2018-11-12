import { Component, OnInit, Input } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'
import { player } from './../models/player.model'
import * as boardgameActions from './../actions/boardgame.actions'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-play-game-modal',
  templateUrl: './play-game-modal.component.html',
  styleUrls: ['./play-game-modal.component.css']
})
export class PlayGameModalComponent implements OnInit {
  @Input() boardGame: any;

  playerList: string[] = ["player1","player2","player3","player4"];
  playGameDialogShow: boolean = false;
  player: any;
  players: string[] = [];
  filteredPlayers: any[];
  date1: Date;

  constructor(private service: BordGameService,private store: Store<AppState>) { 
  }

  ngOnInit() {
  }

  PlayGame() {
    this.playGameDialogShow = true;
  }

  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  filterPlayers(event) {
    this.filteredPlayers = [];
    for(let i = 0; i < this.playerList.length; i++) {
        let brand = this.playerList[i];
        if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredPlayers.push(brand);
        }
    }
  }

  autoCompleteKeyPress(event){
    if ((event.keyCode === 188 || event.keyCode === 13) && (!this.isEmptyOrSpaces(this.player))){
      this.players.push(this.player);
      this.player = "";
    }
  }

  addPlayer(event){
    this.players.push(this.player);
    this.player = "";
  }
}
