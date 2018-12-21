import { Action } from '@ngrx/store';
import { boardgame } from './../models/boardgames.model';
import * as PlayersActions from './../actions/player.actions';
import { player } from './../models/player.model';

const initState: player[] = [];

export function playerReducer (state: player[] = initState, action: PlayersActions.Actions) {
  switch (action.type) {
    case PlayersActions.ADD_PLAYER:
      if (state.some(p => p.Name == action.payload.Name)) {
        return state;
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
}
