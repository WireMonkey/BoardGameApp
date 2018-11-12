import { Component, OnInit } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'
import { NgxSpinnerService } from 'ngx-spinner';
import * as boardgameActions from './../actions/boardgame.actions'

@Component({
  selector: 'app-refresh-data',
  templateUrl: './refresh-data.component.html',
  styleUrls: ['./refresh-data.component.css']
})
export class RefreshDataComponent implements OnInit {
  BoardGames: any;

  constructor(private spinner: NgxSpinnerService, private service: BordGameService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  resetButtonCLick(event: any) {
    this.spinner.show();

    this.store.dispatch(new boardgameActions.ClearBoardGame());
    console.log("show");

    this.service.getBoardGames().subscribe(data =>{

      this.BoardGames = Object.keys(data).map(function(key) {
        return data[key];
      });

      //Pass all boardgames into store
      for (let index = 0; index < this.BoardGames.length; index++) {
        this.store.dispatch(new boardgameActions.AddBoardGame(this.BoardGames[index]));
      }

      //hide spinner
      this.spinner.hide();
      console.log("hide");
    });
  }
}
