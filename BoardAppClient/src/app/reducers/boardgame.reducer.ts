import { Action } from '@ngrx/store';
import { boardgame } from './../models/boardgames.model';
import * as BoardgameActions from './../actions/boardgame.actions';

const initState: boardgame[] = [];

export function boardGameReducer(state: boardgame[] = initState, action: BoardgameActions.Actions) {
  switch (action.type) {
    case BoardgameActions.ADD_BOARDGAME:
    case BoardgameActions.ERROR_ADD_BOARDGAME:
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
      let newList = state.filter(game => {
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
    case BoardgameActions.ADD_BOARDGAMES:
      state = action.payload;
      state = state.sort((a, b) => {
        const tA = a.Name;
        const tB = b.Name;
        return (tA < tB) ? -1 : (tA > tB) ? 1 : 0;
      });
      return state;
    case BoardgameActions.ERROR_BOARDGAMES:
      //let game = state.find(x => x._id == action.payload._id);
      let game = state.find(x => x.Id == action.payload.Id);
      game.Name = action.payload.Name;
      game.Expansions = action.payload.Expansions;
      game.Plays = action.payload.Plays
      game.Notes = action.payload.Notes
      return state;
    case BoardgameActions.REMOVE_BOARDGAMES:
    case BoardgameActions.ERROR_REMOVE_BOARDGAMES:
      return state.filter(game => {
        return game.Name !== action.payload.Name;
      });
    case BoardgameActions.SETID_BOARDGAMES:
      // let newGame = state.find(x => x._id == null);
      // newGame._id = action.id;
      // newGame._rev = action.rev;
      let newGame = state.find(x => x.Id == null);
      newGame.Id = action.id;
      return state;
    default:
      return state;
  }
}
