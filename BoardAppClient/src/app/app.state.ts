import {boardgame} from './models/boardgames.model'
import {player} from './models/player.model'

export interface AppState {
  readonly boargame: boardgame[];
  readonly player: player[];
}
