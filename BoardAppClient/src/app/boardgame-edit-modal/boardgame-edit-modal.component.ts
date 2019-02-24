import { Component, OnInit, Input } from '@angular/core';
import { boardgame } from '../models/boardgames.model';
import { BordGameService } from '../services/bord-game.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-boardgame-edit-modal',
  templateUrl: './boardgame-edit-modal.component.html',
  styleUrls: ['./boardgame-edit-modal.component.css']
})
export class BoardgameEditModalComponent implements OnInit {
  editDialogShow: boolean = false;
  hasExpansions: boolean = false;
  origionalCopy: boardgame = {_id:null,_rev: null,Expansions:[],Name:null,Plays:null,Notes:null};
  displayStyle: any = {display: ""};

  @Input() boardGame: any;
  
  constructor(private messageService: MessageService, private service: BordGameService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  EditGame(event: any) {
    this.origionalCopy = JSON.parse(JSON.stringify(this.boardGame));
    this.displayStyle.display = this.boardGame.Expansions.length == 0 ? "none" : "block";
    this.editDialogShow = true;
  }

  saveEdits(event: any) {
    this.spinner.show();
    this.service.updateBoardGame(this.boardGame).subscribe(data =>{
      this.editDialogShow = false;
      this.spinner.hide();
    }, error => {
      this.cancelEdits(null);
      this.spinner.hide();
      let message = "Error saving boardgame changes."
      if(error.status == 0) {
        message += " Unable to reach server."
      }
      this.messageService.add({severity:'error', summary:'Error', detail: message});
    });
  }

  cancelEdits(event: any) {
    for (let index = 0; index < this.boardGame.Expansions.length; index++) {
      this.boardGame.Expansions[index].Name = this.origionalCopy.Expansions[index].Name;
    }
    this.boardGame.Name = this.origionalCopy.Name;
    this.boardGame.Notes = this.origionalCopy.Notes;

    this.editDialogShow = false;
  }
}
