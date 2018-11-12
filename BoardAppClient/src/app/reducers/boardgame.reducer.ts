import { Action } from '@ngrx/store'
import { boardgame } from './../models/boardgames.model'
import * as BoardgameActions from './../actions/boardgame.actions'

const initState: boardgame[] = [];

export function reducer (state: boardgame[] = initState, action: BoardgameActions.Actions){
  switch(action.type){
    case BoardgameActions.ADD_BOARDGAME:
      return [...state,action.payload];
    case BoardgameActions.CLEAR_BOARDGAME:
      state = initState;
      return state;
    default:
      return state;
  }
}
