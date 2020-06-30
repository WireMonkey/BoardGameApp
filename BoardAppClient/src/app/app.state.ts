import {boardgame} from './models/boardgames.model';
import {player} from './models/player.model';
import { Stats } from './models/stats';

export interface AppState {
  readonly boargame: boardgame[];
  readonly player: player[];
  readonly stats: Stats;
}
