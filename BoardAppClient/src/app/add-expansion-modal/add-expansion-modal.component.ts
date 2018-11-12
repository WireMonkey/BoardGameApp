import { Component, OnInit, Input } from '@angular/core';
import { BordGameService } from './../services/bord-game.service';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { boardgame } from './../models/boardgames.model'
import * as boardgameActions from './../actions/boardgame.actions'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-expansion-modal',
  templateUrl: './add-expansion-modal.component.html',
  styleUrls: ['./add-expansion-modal.component.css']
})
export class AddExpansionModalComponent implements OnInit {
  @Input() boardGame: boardgame;
  expDialogShow: boolean = false;
  public NewExpansion: string = "";

  constructor(private service: BordGameService,private store: Store<AppState>) { }

  ngOnInit() {
  }

  AddExpansion() {
    this.expDialogShow = true;
  }

  saveExpansion(event: any) {
    this.boardGame.Expansions.push(this.NewExpansion);
    
    this.service.updateBoardGame(this.boardGame).subscribe(data =>{
      this.expDialogShow = false;
      this.NewExpansion = "";
    })
  }
}
