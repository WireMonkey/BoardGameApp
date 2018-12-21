import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { boardgame } from '../models/boardgames.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as moment from 'moment';
import { SortIcon } from 'primeng/table';

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.css']
})
export class StatBarComponent implements OnInit {
  BoardGames$: Observable<any>;
  private boardgameSub: Subscription;
  boardGames: boardgame[];
  lastGame: boardgame = {
    Name: '', Plays: [{Date: null, Players: [], Winner: '', Notes: '', Expansions: []}], Expansions: [], Notes: '', Id: ''
  };
  MostPlays = '';
  MostWins: string;
  timer: any;
  interval = 500;

  constructor(private store: Store<AppState>) {
    this.BoardGames$ = this.store.select('boardgame');
  }

  ngOnInit() {
    this.boardgameSub = this.BoardGames$.subscribe(state => {
      this.boardGames = state;
    });

    this.timer = setInterval(() => {
      if (this.boardGames) {
        this.interval = 10000;
        this.GetLastPlayedGame();
        this.GetMostPlayed();
        this.GetMostWins();
      }
    }, this.interval);
  }

  GetLastPlayedGame() {
    const playGames = this.boardGames.filter(b => b.Plays && b.Plays.length > 0);
    if (playGames.length > 0) {
      this.lastGame = playGames.sort(function(a, b) {
        const first = a.Plays[0].Date;
        const second = b.Plays[0].Date;
        if (moment(first).isBefore(moment(second))) {
          return 1;
        } else if (moment(first).isAfter(moment(second))) {
          return -1;
        } else {
          return 0;
        }
      })[0];
    } else {
      this.lastGame = {
        Name: '', Plays: [{Date: null, Players: [], Winner: '', Notes: '', Expansions: []}], Expansions: [], Notes: '', Id: ''
      };
    }
  }

  GetMostPlayed() {
    const playedGames = this.boardGames.filter(b => b.Plays && b.Plays.length > 0);
    this.MostPlays = playedGames.length > 0 ? playedGames.sort((a, b) => b.Plays.length - a.Plays.length)[0].Name : '';
  }

  GetMostWins() {
    const winners = [];
    this.boardGames.filter(b => b.Plays && b.Plays.length > 0).forEach(game => {
      game.Plays.forEach(play => {
        if (winners.every(w => w.Name !== play.Winner)) {
          winners.push({Name: play.Winner, count: 1});
        } else {
          winners.find(w => w.Name === play.Winner).count += 1;
        }
      });
    });
    console.log(winners);
    this.MostWins = winners.length > 0 ? winners.sort((a, b) => b.count - a.count )[0].Name : '';
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
