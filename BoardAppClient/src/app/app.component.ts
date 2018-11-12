import { BordGameService } from './services/bord-game.service';
import { Component } from '@angular/core';
import { BoardGameGridComponent } from './board-game-grid/board-game-grid.component';
import { RefreshDataComponent } from './refresh-data/refresh-data.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { boardgame } from './models/boardgames.model'
import * as boardgameActions from './actions/boardgame.actions'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  BoardGames: any;
  title = 'BoardAppClient';
  constructor(private spinner: NgxSpinnerService, private service: BordGameService, private store: Store<AppState>) { }

  ngOnInit() {
    //show spinner
    this.spinner.show();

    //Call Service to get all boardgames
    this.service.getBoardGames().subscribe(data =>{
      console.log(data);

      this.BoardGames = Object.keys(data).map(function(key) {
        return data[key];
      });

      //Pass all boardgames into store
      for (let index = 0; index < this.BoardGames.length; index++) {
        this.store.dispatch(new boardgameActions.AddBoardGame(this.BoardGames[index]));
      }

      //hide spinner
      this.spinner.hide();
    });
  }
}
