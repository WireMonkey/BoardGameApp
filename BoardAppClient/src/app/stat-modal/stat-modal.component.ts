import { Component, OnInit, Input } from '@angular/core';
import { StatsService } from '../services/stats.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stat-modal',
  templateUrl: './stat-modal.component.html',
  styleUrls: ['./stat-modal.component.css']
})
export class StatModalComponent implements OnInit {
  showDialog:boolean = false;

  playerCols: any[];
  gameCols: any[];

  constructor(public statsService: StatsService) { }

  ngOnInit() {
    this.playerCols = [
      { field: 'Name', header: 'Name' },
      { field: 'Plays', header: 'Total Games' },
      { field: 'Wins', header: 'Total Wins' },
      { field: 'Rate', header: 'Winning %' }
     ];

    this.gameCols = [
      { field: 'Name', header: 'Name' },
      { field: 'LastPlayed', header: 'Last Played' },
      { field: 'MostWins', header: 'Most Wins' },
      { field: 'TotalPlays', header: 'Total Plays' },
    ]
  }

  isNumber(data: any){
    return isNaN(data);
  }

  formatDate(date: Date) {
    if(date == null){
      return "";
    }
    const formatDate = moment(date);
    return formatDate.format('MMM Do YYYY');
  }

}
