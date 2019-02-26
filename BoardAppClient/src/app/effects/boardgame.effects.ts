import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, observable } from 'rxjs';
import * as BoardgameActions from './../actions/boardgame.actions';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { BordGameService } from '../services/bord-game.service';
import { boardgame } from '../models/boardgames.model';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../app.state';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { player } from '../models/player.model';
import * as playerActions from '../actions/player.actions';
import { StatsService } from '../services/stats.service';

const toPayload = <T>(action: { payload: T }) => action.payload;

@Injectable()
export class BoardgameEffects {

  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private actions$: Actions, private http: HttpClient, private boardgameService: BordGameService, private store: Store<AppState>, private statsService: StatsService) { }

  @Effect()
  LoadBoardGames$ = this.actions$.pipe(
    ofType(BoardgameActions.LOAD_BOARDGAME),
    switchMap(() => {
      this.spinner.show();
      return this.boardgameService.getBoardGames().pipe(
        map((games: boardgame[]) => {
          return new BoardgameActions.AddBoardGames(games);
        }),
        tap((act: any) => {
          let players: player[] = [];
          act.payload.forEach(game => {
            game.Plays.forEach(play => {
              play.Players.forEach(pl => {
                players.push({ Name: pl });
              });
            });
          });

          this.store.dispatch(new playerActions.AddPlayers(players));
        }),
        tap((act: any) => {
          this.statsService.CalculateStats(act.payload);
        }),
        tap(() => {
          this.spinner.hide();
        }),
        catchError(err => {
          let message = 'Error occured retriving data.';
          if (err.status === 0) {
            message += ' Unable to reach server.';
          }
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
          this.spinner.hide();
          throw err;
        })
      );
    })
  );

  @Effect()
  PlayBoardgame$ = this.actions$.pipe(
    ofType(BoardgameActions.PLAY_BOARDGAMES),
    switchMap((action: any) => {
      return this.boardgameService.updateBoardGame(action.payload).pipe(
        map(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Played game recorded.' });
          return new BoardgameActions.DoneBoardgames();
        }),
        tap((act: any) => {
          let players: player[] = [];
          action.payload.Plays.forEach(play => {
            play.Players.forEach(pl => {
              players.push({ Name: pl });
            });
          });

          this.store.dispatch(new playerActions.AddPlayers(players));
        }),
        tap((act: any) => {
          this.statsService.addGamePlay(action.payload);
        }),
        catchError(err => {
          let message = 'Unable to record game play. ';
          if (err.status === 0) {
            message += 'Unable to reach server.';
          }
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
          this.store.dispatch(new BoardgameActions.ErrorBoardGames(action.orig));
          throw err;
        })
      )
    })
  );

  @Effect()
  UpdateBoardGame$ = this.actions$.pipe(
    ofType(BoardgameActions.UPDATE_BOARDGAME),
    switchMap((action: any) => {
      return this.boardgameService.updateBoardGame(action.payload).pipe(
        map(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Boardgame Updated.' });
          return new BoardgameActions.DoneBoardgames();
        }),
        catchError(err => {
          let message = 'Unable to add expansion. ';
          if (err.status === 0) {
            message += 'Unable to reach server.';
          }
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
          this.store.dispatch(new BoardgameActions.ErrorBoardGames(action.orig));
          throw err;
        })
      );
    })
  )

  @Effect()
  AddBoardGame$ = this.actions$.pipe(
    ofType(BoardgameActions.ADD_BOARDGAME),
    switchMap((action: any) => {
      return this.boardgameService.updateBoardGame(action.payload).pipe(
        map((response: any) => {
          if(response.ok){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Boardgame saved.' });
            return new BoardgameActions.SetBoardgameId(response.id,response.rev);
          } else {
            throw Error("Not Saved");
          }
        }),
        catchError(err => {
          let message = 'Unable to add boardgame. ';
          if (err.status === 0) {
            message += 'Unable to reach server.';
          }
          this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
          this.store.dispatch(new BoardgameActions.RemoveBoardgame(action.payload));
          throw err;
        })
      )
    })
  )
}
