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
  @Input() boardGame: any;
  expDialogShow: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  AddExpansion() {
    this.expDialogShow = true;
  }
}
