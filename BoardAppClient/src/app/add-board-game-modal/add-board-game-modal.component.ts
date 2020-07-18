import { BordGameService } from './../services/bord-game.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'
import { NgxSpinnerService } from 'ngx-spinner';
import * as boardgameActions from './../actions/boardgame.actions';
import { MessageService } from 'primeng/api';
import { gameplay } from '../models/gameplay.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-board-game-modal',
  templateUrl: './add-board-game-modal.component.html',
  styleUrls: ['./add-board-game-modal.component.css']
})
export class AddBoardGameModalComponent implements OnInit {
  public NewBoardGame: string = "";


  constructor(private messageService: MessageService, private service: BordGameService, private store: Store<AppState>, private spinner: NgxSpinnerService, private userService: UserService) { }

  ngOnInit() {
  }

  addBoardGameShow: boolean = false;

  AddBoardGame() {
    let saveData: boardgame = { UserId: null, Name: this.NewBoardGame, Expansions: [], Plays: [], Notes: "", _id: null, _rev: null };
    this.store.dispatch(new boardgameActions.AddBoardGame(saveData));

    this.NewBoardGame = '';
    this.addBoardGameShow = false;
  }

  HideModal() {
    this.NewBoardGame = '';
  }

  ShowModal() {
    this.NewBoardGame = '';
    this.addBoardGameShow = true;
  }
}
