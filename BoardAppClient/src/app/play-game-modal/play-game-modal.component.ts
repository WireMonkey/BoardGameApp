import { Component, OnInit, Input } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'
import { player } from './../models/player.model'
import * as boardgameActions from './../actions/boardgame.actions'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-play-game-modal',
  templateUrl: './play-game-modal.component.html',
  styleUrls: ['./play-game-modal.component.css']
})
export class PlayGameModalComponent implements OnInit {
  @Input() boardGame: any;

  playerList: string[] = [];
  playGameDialogShow: boolean = false;
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

  constructor(private service: BordGameService, private store: Store<AppState>, private messageService: MessageService, private spinner: NgxSpinnerService) { 
    this.playerStore = this.store.select('player');   
  }

  ngOnInit() {
    this.playerStore.subscribe(store => {
      this.storeList = store;
    })
  }

  PlayGame() {
    this.playGameDialogShow = true;

    this.playerList = this.storeList.map(p => {return p.Name});
    this.expansions = this.boardGame.Expansions.map(e => {return {label: e.Name, value: e.Name}});
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

  hideModal(){
    this.playGameDialogShow = false;
    this.date1 = new Date;
    this.players = [];
    this.notes = "";
    this.player = "";
    this.gameWinner ="";
  }

  saveGamePlay(event: any){
    this.spinner.show();
    let gamePlay = {Date: this.date1, Players: this.players, Winner: this.gameWinner, Notes: this.notes, Expansions: this.selectedExpansions};
    
    this.service.updateBoardGame(this.boardGame).subscribe(data =>{
      this.boardGame.Plays.push(gamePlay);

      this.hideModal()
      this.spinner.hide();
      this.messageService.add({severity:'success', summary:'Success!', detail:'Game play info saved.'})
    }, error => {
      this.hideModal()
      this.spinner.hide();
      let message = "Error saving game play."
      if(error.status == 0) {
        message = "Unable to reach server."
      }
      this.messageService.add({severity:'error', summary:'Error', detail: message});
    });

  }
}
