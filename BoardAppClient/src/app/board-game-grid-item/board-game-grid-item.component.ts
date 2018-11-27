import { Component, OnInit, Input } from '@angular/core';
import { boardgame } from '../models/boardgames.model';
import * as moment from 'moment';

@Component({
  selector: 'app-board-game-grid-item',
  templateUrl: './board-game-grid-item.component.html',
  styleUrls: ['./board-game-grid-item.component.css']
})
export class BoardGameGridItemComponent implements OnInit {
  @Input() boardGame: boardgame;
  constructor() { }

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
}
