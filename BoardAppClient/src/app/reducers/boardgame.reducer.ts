import { Action } from '@ngrx/store'
import { boardgame } from './../models/boardgames.model'
import * as BoardgameActions from './../actions/boardgame.actions'

const initState: boardgame[] = [];

export function boardGameReducer (state: boardgame[] = initState, action: BoardgameActions.Actions){
  switch(action.type){
    case BoardgameActions.ADD_BOARDGAME:
      return [...state,action.payload];
    case BoardgameActions.CLEAR_BOARDGAME:
      state = initState;
      return state;
    case BoardgameActions.UPDATE_BOARDGAME:
      let newList = state.filter(game => {
        return game.Name != action.payload.Name
      });
      
      state = newList;
      state.push(action.payload);
      state = state.sort((a,b) =>{
        let tA = a.Name;
        let tB = b.Name;
        return (tA < tB) ? -1 : (tA > tB) ? 1 : 0;
      });
      return state;
    default:
      return state;
  }
}
