import { Component, OnInit, Input } from '@angular/core';
import { boardgame } from '../models/boardgames.model';
import { BordGameService } from '../services/bord-game.service';

@Component({
  selector: 'app-boardgame-edit-modal',
  templateUrl: './boardgame-edit-modal.component.html',
  styleUrls: ['./boardgame-edit-modal.component.css']
})
export class BoardgameEditModalComponent implements OnInit {
  editDialogShow: boolean = false;
  hasExpansions: boolean = false;
  origionalCopy: boardgame = {Id:null,Expansions:[],Name:null,Plays:null};
  displayStyle: any = {display: ""};

  @Input() boardGame: any;
  
  constructor(private service: BordGameService,) { }

  ngOnInit() {
  }

  EditGame(event: any) {
    this.origionalCopy = JSON.parse(JSON.stringify(this.boardGame));
    this.displayStyle.display = this.boardGame.Expansions.length == 0 ? "none" : "block";
    this.editDialogShow = true;
  }

  saveEdits(event: any) {
    this.service.updateBoardGame(this.boardGame).subscribe(data =>{
      this.editDialogShow = false;
    })
  }

  cancelEdits(event: any) {
    for (let index = 0; index < this.boardGame.Expansions.length; index++) {
      this.boardGame.Expansions[index].Name = this.origionalCopy.Expansions[index].Name;
    }
    this.boardGame.Name = this.origionalCopy.Name;

    this.editDialogShow = false;
  }
}
