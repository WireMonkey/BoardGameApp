import { Action } from '@ngrx/store';
import { boardgame } from './../models/boardgames.model';
import * as BoardgameActions from './../actions/boardgame.actions';

const initState: boardgame[] = [];

export function boardGameReducer (state: boardgame[] = initState, action: BoardgameActions.Actions) {
  switch (action.type) {
    case BoardgameActions.ADD_BOARDGAME:
      state.push(action.payload);
      state = state.sort((a, b) => {
        const tA = a.Name;
        const tB = b.Name;
        return (tA < tB) ? -1 : (tA > tB) ? 1 : 0;
      });
      return state;
    case BoardgameActions.CLEAR_BOARDGAME:
      state = [];
      return state;
    case BoardgameActions.UPDATE_BOARDGAME:
      const newList = state.filter(game => {
        return game.Name !== action.payload.Name;
      });

      state = newList;
      state.push(action.payload);
      state = state.sort((a, b) => {
        const tA = a.Name;
        const tB = b.Name;
        return (tA < tB) ? -1 : (tA > tB) ? 1 : 0;
      });
      return state;
    default:
      return state;
  }
}
