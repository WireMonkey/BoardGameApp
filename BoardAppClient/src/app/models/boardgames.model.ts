export interface boardgame{
  Id: string;
  Name: string;
  Notes: string;
  Expansions: {
    Name: string;
  }[];
  Plays: {
    Date: Date;
    Players: string[];
    Winner: string;
    Notes: string;
    Expansions: string[];
  }[];
}
