export interface boardgame{
  Id: string;
  Name: string;
  Expansions: string[];
  Plays: {
    Date: Date;
    Players: string[];
    Winner: string;
  }[];
}
