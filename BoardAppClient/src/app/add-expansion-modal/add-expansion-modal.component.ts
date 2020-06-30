import { Component, OnInit, Input } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'
import * as boardgameActions from './../actions/boardgame.actions'
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-expansion-modal',
  templateUrl: './add-expansion-modal.component.html',
  styleUrls: ['./add-expansion-modal.component.css']
})
export class AddExpansionModalComponent implements OnInit {
  @Input() boardGame: boardgame;
  expDialogShow: boolean = false;
  public NewExpansion: string = "";

  constructor(private messageService: MessageService, private service: BordGameService, private store: Store<AppState>, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  AddExpansion() {
    this.expDialogShow = true;
  }

  saveExpansion(event: any) {
    let org = JSON.parse(JSON.stringify(this.boardGame));

    this.boardGame.Expansions.push({ Name: this.NewExpansion });
    this.store.dispatch(new boardgameActions.UpdateBoardGame(this.boardGame, org));

    this.expDialogShow = false;
    this.NewExpansion = '';
  }
}
