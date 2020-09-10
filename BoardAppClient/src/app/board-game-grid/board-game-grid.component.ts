import { Component, OnInit, ViewChild } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model';
import { state } from '@angular/animations';
import { map } from 'rxjs/operators';
import { DataView } from 'primeng/dataview';


@Component({
  selector: 'app-board-game-grid',
  templateUrl: './board-game-grid.component.html',
  styleUrls: ['./board-game-grid.component.css']
})
export class BoardGameGridComponent implements OnInit {
  BoardGames$: Observable<boardgame[]>;
  searchGame: string;
  filteredGames: any[] = [];
  @ViewChild('dv') grid: DataView;
  //private boardgameSub: Subscription;
  //boardGames: boardgame[];



  constructor(private service: BordGameService, private store: Store<AppState>) {
    this.BoardGames$ = this.store.select('boardgame');
  }

  ngOnInit() {
  }

  filterPlayers(event) {
    this.filteredGames = [];
    let gameNames = [];

    let bSub = this.BoardGames$.subscribe(state => {
      gameNames = state.map(g => { return g.Name });
    });
    
    for (let i = 0; i < gameNames.length; i++) {
      let name = gameNames[i];
      if (name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredGames.push(name);
      }
    }

    bSub.unsubscribe();
  }

  trackBoardgame(i: number, game: boardgame){
    if(game){
      return game._id;
    }
    return i;
  }

  log(event: any){
    console.log(event);
  }
}
