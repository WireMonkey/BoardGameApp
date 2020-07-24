import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StatsService } from '../services/stats.service';
import * as moment from 'moment';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-stat-modal',
  templateUrl: './stat-modal.component.html',
  styleUrls: ['./stat-modal.component.css']
})
export class StatModalComponent implements OnInit {
  showDialog:boolean = false;

  playerCols: any[];
  gameCols: any[];

  @ViewChild('playerDt') playerDt: Table;
  @ViewChild('gameDt') gameDt: Table;

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

  closeModal(){
    this.playerDt.reset();
    this.gameDt.reset();
    this.statsService.resetSorting();
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
