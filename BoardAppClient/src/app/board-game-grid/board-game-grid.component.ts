import { Component, OnInit } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'

@Component({
  selector: 'app-board-game-grid',
  templateUrl: './board-game-grid.component.html',
  styleUrls: ['./board-game-grid.component.css']
})
export class BoardGameGridComponent implements OnInit {
  BoardGames: Observable<boardgame[]>;

  constructor(private service: BordGameService, private store: Store<AppState>) {
    this.BoardGames = this.store.select('boardgame');
  }

  ngOnInit() {
  }


}
