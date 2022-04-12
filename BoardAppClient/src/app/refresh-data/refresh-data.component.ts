import { Component, OnInit } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model';
import { NgxSpinnerService } from 'ngx-spinner';
import * as boardgameActions from './../actions/boardgame.actions';
import * as playerActions from './../actions/player.actions';
import {MessageService} from 'primeng/api';
import { player } from '../models/player.model';

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
    this.store.dispatch(new boardgameActions.LoadBoardGames());
  }
}
