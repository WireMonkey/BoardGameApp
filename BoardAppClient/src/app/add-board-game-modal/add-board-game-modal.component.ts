import { BordGameService } from './../services/bord-game.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'
import { NgxSpinnerService } from 'ngx-spinner';
import * as boardgameActions from './../actions/boardgame.actions';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-board-game-modal',
  templateUrl: './add-board-game-modal.component.html',
  styleUrls: ['./add-board-game-modal.component.css']
})
export class AddBoardGameModalComponent implements OnInit {
  public NewBoardGame: string = "";


  constructor(private messageService: MessageService, private service: BordGameService,private store: Store<AppState>, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  addBoardGameShow: boolean = false;
  
  AddBoardGame() {
    this.spinner.show();
    let saveData:any = {Name: this.NewBoardGame, Expansions: [], Plays: []};
    this.service.updateBoardGame(saveData).subscribe(data =>{
      let returned = data as any;
      let boardGame:any = {Id: returned.Id, Name: this.NewBoardGame, Expansions: [], Plays: []};
      this.store.dispatch(new boardgameActions.AddBoardGame(boardGame));
      this.spinner.hide();
      this.addBoardGameShow = false;
    }, error => {
      this.addBoardGameShow = false;
      this.spinner.hide();
      let message = "Error saving new boardgame."
      if(error.status == 0) {
        message += " Unable to reach server."
      }
      this.messageService.add({severity:'error', summary:'Error', detail: message});
    });
  }

  ShowModal() {
    this.NewBoardGame = "";
    this.addBoardGameShow = true;
  }
}
