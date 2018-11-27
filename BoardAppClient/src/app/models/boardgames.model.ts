export interface boardgame{
  Id: string;
  Name: string;
  Expansions: {
    Name: string;
  }[];
  Plays: {
    Date: Date;
    Players: string[];
    Winner: string;
  }[];
}
