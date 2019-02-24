import { Component, OnInit, Input } from '@angular/core';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-stat-modal',
  templateUrl: './stat-modal.component.html',
  styleUrls: ['./stat-modal.component.css']
})
export class StatModalComponent implements OnInit {
  showDialog:boolean = false;

  cols: any[];

  constructor(public statsService: StatsService) { }

  ngOnInit() {
    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'Plays', header: 'Total Games' },
      { field: 'Wins', header: 'Total Wins' },
      { field: 'Rate', header: 'Winning %' }
     ];
  }

  isNumber(data: any){
    console.log(data);
    console.log(isNaN(data));
    return isNaN(data);
  }

}
