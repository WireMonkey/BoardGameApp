import { Component, OnInit } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'
import { NgxSpinnerService } from 'ngx-spinner';
import * as boardgameActions from './../actions/boardgame.actions'
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-refresh-data',
  templateUrl: './refresh-data.component.html',
  styleUrls: ['./refresh-data.component.css']
})
export class RefreshDataComponent implements OnInit {
  BoardGames: any;

  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private service: BordGameService, private store: Store<AppState>) { }

  ngOnInit() {
  }

  resetButtonCLick(event: any) {
    this.spinner.show();

    this.service.getBoardGames().subscribe(data =>{
      this.store.dispatch(new boardgameActions.ClearBoardGame());

      this.BoardGames = Object.keys(data).map(function(key) {
        return data[key];
      });

      //Pass all boardgames into store
      for (let index = 0; index < this.BoardGames.length; index++) {
        this.store.dispatch(new boardgameActions.AddBoardGame(this.BoardGames[index]));
      }

      this.BoardGames = [];

      //hide spinner
      this.spinner.hide();
    }, error => {
      let message = "Error occured retriving data."
      if(error.status == 0) {
        message += " Unable to reach server."
      }
      this.messageService.add({severity:'error', summary:'Error', detail: message});
      this.spinner.hide();
    });
  }
}
