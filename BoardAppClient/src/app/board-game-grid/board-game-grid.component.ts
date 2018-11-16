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
  BoardGames$: Observable<boardgame[]>;
  searchGame: string;
  filteredGames: any[] = []
  private boardgameSub: Subscription;
  boardGames: boardgame[];
  


  constructor(private service: BordGameService, private store: Store<AppState>) {
    this.BoardGames$ = this.store.select('boardgame');
  }

  ngOnInit() {
    this.boardgameSub = this.BoardGames$.subscribe(state => {
      this.boardGames = state;
    });

  }

  filterPlayers(event) {
    this.filteredGames = [];
    let gameNames = this.boardGames.map(g => {return g.Name});
    for(let i = 0; i < gameNames.length; i++) {
        let brand = gameNames[i];
        if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredGames.push(brand);
        }
    }
  }
}
