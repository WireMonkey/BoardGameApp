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

  constructor(private messageService: MessageService, private service: BordGameService,private store: Store<AppState>, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  AddExpansion() {
    this.expDialogShow = true;
  }

  saveExpansion(event: any) {
    this.spinner.show();
    this.service.updateBoardGame(this.boardGame).subscribe(data =>{
      this.boardGame.Expansions.push({Name: this.NewExpansion});
      
      this.expDialogShow = false;
      this.NewExpansion = "";
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.expDialogShow = false;
      let message = "Error adding expansion to boardgame."
      if(error.status == 0) {
        message += " Unable to reach server."
      }
      this.messageService.add({severity:'error', summary:'Error', detail: message});
    });
  }
}
