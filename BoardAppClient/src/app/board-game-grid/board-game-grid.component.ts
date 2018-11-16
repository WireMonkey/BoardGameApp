import { Component, OnInit } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model';
import { state } from '@angular/animations';


@Component({
  selector: 'app-board-game-grid',
  templateUrl: './board-game-grid.component.html',
  styleUrls: ['./board-game-grid.component.css']
})
export class BoardGameGridComponent implements OnInit {
  BoardGames: Observable<boardgame[]>;
  gameNames: Observable<string[]>;
  player: any;
  games: string[] = [];
  filteredGames: any[];
  totalCount: Observable<number>;
  private boardgameSub: Subscription;

  constructor(private service: BordGameService, private store: Store<AppState>) {
    this.BoardGames = this.store.select(state => state.boargame);
    //this.totalCount = this.store.select(state => state.boargame);
    //this.gameNames = this.store.select(state => state.boargame.map(item => item.Name));
  }

  ngOnInit() {
    this.boardgameSub = this.BoardGames.subscribe(state => {
      console.log(state);
    });
  }

  filterPlayers(event) {
    //this.gameNames.forEach(item => {console.log(item)});

    // for(let i = 0; i < this.gameNames.length; i++) {
    //     let brand = this.gameNames[i];
    //     if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
    //         this.filteredGames.push(brand);
    //     }
    // }
  }

  autoCompleteKeyPress(event){
    
  }

  addPlayer(event){
    
  }

}
