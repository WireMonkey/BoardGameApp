import { boardgame } from "./boardgames.model";

export class Stats {
    lastPlayed: boardgame;
    mostPlayed: boardgame;
    MostWins: {
        Name: string;
        count: number;
    };
    HighestWinRate: {
        Name: string;
        Wins: number;
        Plays: number;
        Rate: number;
    };
}
