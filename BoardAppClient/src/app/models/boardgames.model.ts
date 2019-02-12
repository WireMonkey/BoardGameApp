import { gameplay } from "./gameplay.model";

export interface boardgame{
  Id: string;
  Name: string;
  Notes: string;
  Expansions: {
    Name: string;
  }[];
  Plays: gameplay[];
}
