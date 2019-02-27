import { Injectable } from '@angular/core';
import { boardgame } from '../models/boardgames.model';
import { Stats } from '../models/stats';
import * as moment from 'moment';
import { gameplay } from '../models/gameplay.model';
import { boardgameStats } from '../models/boardgameStats.model';
import { count } from 'rxjs/operators';

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
      //_id: '',
      //_rev: '',
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
      //_id: '',
      //_rev: '',
      Id: '',
      Name: '',
      Notes: '',
      Plays: []
    }
  };
  playerList = [];
  gameList: boardgameStats[] = [];

  constructor() { }

  CalculateStats(games: boardgame[]): void {
    this.playerList = [];
    const PlayedGames = games.filter(b => b.Plays && b.Plays.length > 0);
    this.CreatePlayerList([...PlayedGames]);
    this.CreateBoardgameList([...games]);

    this.statData.lastPlayed = this.getLastPlayed([...PlayedGames]);
    this.statData.mostPlayed = this.GetMostPlayed([...PlayedGames]);
    this.statData.MostWins = this.GetMostWins();
    this.statData.HighestWinRate = this.getHighestWinRate();
  }

  addGamePlay(game: boardgame): void {
    this.AddPlayers(game.Plays[0]);
    this.AddBoardGame(game);

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
        Name: '', Plays: [{ Date: null, Players: [], Winner: '', Notes: '', Expansions: [] }], Expansions: [], Notes: '', Id: ''// _id: '', _rev: ''
      };
    }
  }

  private GetMostPlayed(games: boardgame[]): boardgame {
    if (games.length > 0) {
      return games.sort((a, b) => b.Plays.length - a.Plays.length)[0];
    } else {
      return {
        Name: '', Plays: [{ Date: null, Players: [], Winner: '', Notes: '', Expansions: [] }], Expansions: [], Notes: '', Id: '' //_id: '', _rev: ''
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
      return winners.sort((a, b) => {
        return b.Wins - a.Wins;
      })[0];
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

    this.playerList.sort((a, b) => {
      return b.Rate - a.Rate;
    });
    
    return this.playerList[0];
  }

  private CreateBoardgameList(games: boardgame[]) {
    this.gameList = games.map(game => {
      return this.CalcBoardgameStats(game);
    }).filter(g => g.LastPlayed !== null);

    this.gameList.sort(function(a, b) {
      if (moment(a.LastPlayed).isBefore(moment(b.LastPlayed))) {
        return 1;
      } else if (moment(a.LastPlayed).isAfter(moment(b.LastPlayed))) {
        return -1;
      } else {
        return 0;
      } 
    });
  }

  private AddBoardGame(game: boardgame) {
    let gameStats = this.gameList.find(g => g._id == game.Id);
    if(gameStats){
      gameStats.LastPlayed = game.Plays[0].Date;
      gameStats.TotalPlays = game.Plays.length;
      this.CalcBoardgameWinner(game,gameStats);
    } else {
      this.gameList.push(this.CalcBoardgameStats(game));
    }

    this.gameList.sort(function(a, b) {
      if (moment(a.LastPlayed).isBefore(moment(b.LastPlayed))) {
        return 1;
      } else if (moment(a.LastPlayed).isAfter(moment(b.LastPlayed))) {
        return -1;
      } else {
        return 0;
      } 
    });
  }

  private CalcBoardgameStats(game: boardgame): boardgameStats {
    let gameStats: boardgameStats = {
      LastPlayed: null,
      MostWins: null,
      Name: null,
      TotalPlays: null,
      _id: null
    };

    gameStats._id = game.Id//game._id;
    gameStats.Name = game.Name;
    gameStats.TotalPlays = game.Plays.length;
    gameStats.LastPlayed = (game.Plays.length >= 1) ? game.Plays[0].Date : null;
    this.CalcBoardgameWinner(game,gameStats);    

    return gameStats;
  }

  private CalcBoardgameWinner(game: boardgame, gameStats: boardgameStats){
    const winCounts = game.Plays.map(p => p.Winner).reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    const winners = Object.keys(winCounts);
    if(winners.length > 1) {
      winners.forEach(w => {
        if(gameStats.MostWins === null){
          gameStats.MostWins = w;
        } else if (winCounts[w] > winCounts[gameStats.MostWins]) {
          gameStats.MostWins = w;
        }
      })
    } else if (winners.length === 1) {
      gameStats.MostWins = winners[0];
    }
  }

}
