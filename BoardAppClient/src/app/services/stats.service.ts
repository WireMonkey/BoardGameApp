import { Injectable } from '@angular/core';
import { boardgame } from '../models/boardgames.model';
import { Stats } from '../models/stats';
import * as moment from 'moment';
import { gameplay } from '../models/gameplay.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  statData: Stats = {
    HighestWinRate: {
      Name: '',
      Wins: 0,
      Plays: 0,
      Rate: 0,
    },
    MostWins: {
      count: 0,
      Name: ''
    },
    lastPlayed: {
      Expansions: [],
      Id: '',
      Name: '',
      Notes: '',
      Plays: [{
        Date: null,
        Expansions: [],
        Notes: '',
        Players: [],
        Winner: ''
      }]
    },
    mostPlayed: {
      Expansions: [],
      Id: '',
      Name: '',
      Notes: '',
      Plays: []
    }
  };
  playerList = [];
  private gameList = [];

  constructor() { }

  CalculateStats(games: boardgame[]): void {
    this.playerList = [];
    const PlayedGames = games.filter(b => b.Plays && b.Plays.length > 0);
    this.CreatePlayerList([...PlayedGames]);

    this.statData.lastPlayed = this.getLastPlayed([...PlayedGames]);
    this.statData.mostPlayed = this.GetMostPlayed([...PlayedGames]);
    this.statData.MostWins = this.GetMostWins();
    this.statData.HighestWinRate = this.getHighestWinRate();
  }

  addGamePlay(game: boardgame): void {
    this.AddPlayers(game.Plays[0]);

    this.statData.lastPlayed = game;
    this.statData.MostWins = this.GetMostWins();
    this.statData.HighestWinRate = this.getHighestWinRate();
  }

  private getLastPlayed(games: boardgame[]): boardgame {
    if (games.length > 0) {
      return games.sort(function (a, b) {
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
      return {
        Name: '', Plays: [{ Date: null, Players: [], Winner: '', Notes: '', Expansions: [] }], Expansions: [], Notes: '', Id: ''
      };
    }
  }

  private GetMostPlayed(games: boardgame[]): boardgame {
    if (games.length > 0) {
      return games.sort((a, b) => b.Plays.length - a.Plays.length)[0];
    } else {
      return {
        Name: '', Plays: [{ Date: null, Players: [], Winner: '', Notes: '', Expansions: [] }], Expansions: [], Notes: '', Id: ''
      };
    }
  }

  private CreatePlayerList(games: boardgame[]): void {
    games.forEach(game => {
      game.Plays.forEach(play => {
        play.Players.forEach(p => {
          this.addToList(p, play);
        });
      });
    });
  }

  private AddPlayers(play: gameplay): void {
    play.Players.forEach(p => {
      this.addToList(p, play);
    });

    this.playerList.sort((a, b) => b.Rate - a.Rate);
  }

  private addToList(p: any, play: gameplay) {
    if (this.playerList.every(x => x.Name !== p)) {
      if (play.Winner === p) {
        this.playerList.push({ Name: p, Wins: 1, Plays: 1 });
      } else {
        this.playerList.push({ Name: p, Wins: 0, Plays: 1 });
      }
    } else {
      let pls = this.playerList.find(x => x.Name === p);
      pls.Plays += 1;
      if (play.Winner === p) {
        pls.Wins += 1;
      }
    }
  }

  private GetMostWins() {
    const winners = this.playerList.filter(x => x.Wins > 0);

    if (winners.length > 0) {
      return winners.sort((a, b) => b.count - a.count)[0];
    } else {
      return { Name: '', Wins: 0, Plays: 0 };
    }
  }

  private getHighestWinRate() {
    const players = this.playerList.filter(p => (p.Wins + p.Plays) > 2);

    players.forEach(p => {
      if (p.Wins > 0) {
        p.Rate = p.Wins / p.Plays;
      } else {
        p.Rate = 0;
      }
    });

    this.playerList.sort((a, b) => b.Rate - a.Rate);
    
    return players.sort((a, b) => b.Rate - a.Rate)[0];
  }
}
