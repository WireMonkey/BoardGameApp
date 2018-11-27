import { BordGameService } from './../services/bord-game.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'
import { NgxSpinnerService } from 'ngx-spinner';
import * as boardgameActions from './../actions/boardgame.actions';

@Component({
  selector: 'app-add-board-game-modal',
  templateUrl: './add-board-game-modal.component.html',
  styleUrls: ['./add-board-game-modal.component.css']
})
export class AddBoardGameModalComponent implements OnInit {
  public NewBoardGame: string = "";


  constructor(private service: BordGameService,private store: Store<AppState>) { }

  ngOnInit() {
  }

  addBoardGameShow: boolean = false;
  
  AddBoardGame() {
    let saveData:any = {Name: this.NewBoardGame, Expansions: [], Plays: []};
    this.service.updateBoardGame(saveData).subscribe(data =>{
      let returned = data as any;
      let boardGame:any = {Id: returned.Id, Name: this.NewBoardGame, Expansions: [], Plays: []};
      this.store.dispatch(new boardgameActions.AddBoardGame(boardGame));

      this.addBoardGameShow = false;
    })
  }

  ShowModal() {
    this.NewBoardGame = "";
    this.addBoardGameShow = true;
  }
}
