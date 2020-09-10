import { gameplay } from "./gameplay.model";

export class boardgame{
  _id: string;
  _rev: string;
  UserId: string;
  //Id: string;
  Name: string;
  Notes: string;
  Expansions: {
    Name: string;
  }[];
  Plays: gameplay[];
}
