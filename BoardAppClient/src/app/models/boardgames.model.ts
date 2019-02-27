import { gameplay } from "./gameplay.model";

export interface boardgame{
  //_id: string;
  //_rev: string;
  Id: string;
  Name: string;
  Notes: string;
  Expansions: {
    Name: string;
  }[];
  Plays: gameplay[];
}
