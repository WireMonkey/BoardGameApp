import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { boardgame } from '../models/boardgames.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as moment from 'moment';
import { SortIcon } from 'primeng/table';
import { Stats } from '../models/stats';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.css']
})
export class StatBarComponent implements OnInit {
  
  constructor(public statsService: StatsService) {
  }

  ngOnInit() {
    this.statsService.statData.MostWins.Name;
  }

  formatDate(date: any) {
    try {
      if (date !== null) {
        const formatDate = moment(date);
        return formatDate.format('MMM Do YYYY');
      } else {
        return '';
      }
    } catch (error) {
      return '';
    }
  }
}
