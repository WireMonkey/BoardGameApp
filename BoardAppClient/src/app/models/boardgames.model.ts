export interface boardgame{
  Name: string;
  Expansions: string[];
  Plays: {
    Date: Date;
    Players: string[];
    Winner: string;
  }[];
}
