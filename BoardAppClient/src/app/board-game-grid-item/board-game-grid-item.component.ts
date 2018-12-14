import { Component, OnInit, Input } from '@angular/core';
import { boardgame } from '../models/boardgames.model';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { BordGameService } from '../services/bord-game.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-board-game-grid-item',
  templateUrl: './board-game-grid-item.component.html',
  styleUrls: ['./board-game-grid-item.component.css']
})
export class BoardGameGridItemComponent implements OnInit {
  @Input() boardGame: boardgame;
  constructor(private messageService: MessageService, private service: BordGameService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  
  formatDate(date: Date) {
    let formatDate = moment(date);
    return formatDate.format('MMM Do YYYY');
  }

  formatPlayerList(list: string[]){
    try {
      return list.join(', ');
    } catch (error) {
      return "";
    }
  }

  formatExpansionList(list: any[]){
    try {
      return list.map(x => {return x.Name}).join(', ');
    } catch (error) {
      return "";
    }
  }

  removePlayedGame(event: any,play: any){
    this.spinner.show();

    let origionalCopy = JSON.parse(JSON.stringify(this.boardGame));

    this.boardGame.Plays = this.boardGame.Plays.filter(p => {return p != play});

    this.service.updateBoardGame(this.boardGame).subscribe(data =>{
      this.messageService.add({severity:'success', summary:'Success', detail: 'Played game removed.'});
      this.spinner.hide();
    }, error => {
      this.boardGame.Plays = origionalCopy.Plays;
      this.spinner.hide();
      let message = "Error saving boardgame changes."
      if(error.status == 0) {
        message += " Unable to reach server."
      }
      this.messageService.add({severity:'error', summary:'Error', detail: message});
    });
  }
}
