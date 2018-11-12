import { Action } from '@ngrx/store'
import { boardgame } from './../models/boardgames.model'
import * as PlayersActions from './../actions/player.actions'
import { player } from './../models/player.model'

const initState: player[] = [];

export function reducer (state: player[] = initState, action: PlayersActions.Actions){
  switch(action.type){
    case PlayersActions.ADD_PLAYER:
      let addPlayers = action.payload.filter(player => state.includes(player));
      state = state.concat(addPlayers);
      return state;
    default:
      return state;
  }
}
