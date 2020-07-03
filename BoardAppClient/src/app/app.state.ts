import {boardgame} from './models/boardgames.model';
import {player} from './models/player.model';
import { Stats } from './models/stats';

export interface AppState {
   boardgame: boardgame[];
   player: player[];
   stats: Stats;
}
