import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { boardgame } from './../models/boardgames.model';

export const ADD_BOARDGAME = '[boardgame] add';
export const CLEAR_BOARDGAME = '[boardgame] clear';
export const UPDATE_BOARDGAME = '[boardgame] update';
export const LOAD_BOARDGAME = '[boardgame] load';
export const ADD_BOARDGAMES = '[boardgame] add multiple';
export const ERROR_BOARDGAMES = '[boardgame] error';
export const PLAY_BOARDGAMES = '[boardgame] play';
export const DONE_BOARDGAMES = '[boardgame] done';
export const REMOVE_BOARDGAMES = '[boardgame] delete';
export const ERROR_REMOVE_BOARDGAMES = '[boardgame] delete';
export const ERROR_ADD_BOARDGAME = '[boardgame] add';
export const SETID_BOARDGAMES = '[boardgame] set id';

export class AddBoardGame implements Action {
  readonly type = ADD_BOARDGAME;

  constructor(public payload: boardgame) { }
}

export class AddBoardGames implements Action {
  readonly type = ADD_BOARDGAMES;

  constructor(public payload: boardgame[]) { }
}

export class ClearBoardGame implements Action {
  readonly type = CLEAR_BOARDGAME;
  constructor() { }
}

export class UpdateBoardGame implements Action {
  readonly type = UPDATE_BOARDGAME;
  constructor(public payload: boardgame, public orig: boardgame) { }
}

export class PlayBoardGame implements Action {
  readonly type = PLAY_BOARDGAMES;
  constructor(public payload: boardgame, public orig: boardgame) { }
}

export class LoadBoardGames implements Action {
  readonly type = LOAD_BOARDGAME;
  constructor() { }
}

export class ErrorBoardGames implements Action {
  readonly type = ERROR_BOARDGAMES;
  constructor(public payload: boardgame) { }
}

export class SetBoardgameId implements Action {
  readonly type = SETID_BOARDGAMES;
  constructor(public id: string, public rev: string) { }
}

export class DoneBoardgames implements Action {
  readonly type = DONE_BOARDGAMES;
  constructor() { }
}

export class RemoveBoardgame implements Action {
  readonly type = REMOVE_BOARDGAMES;
  constructor(public payload: boardgame) { }
}

export class ErrorRemoveBoardgame implements Action {
  readonly type = ERROR_REMOVE_BOARDGAMES;
  constructor(public payload: boardgame) { }
}

export class ErrorAddBoardGame implements Action {
  readonly type = ERROR_ADD_BOARDGAME;

  constructor(public payload: boardgame) { }
}

export type Actions = AddBoardGame | ClearBoardGame | UpdateBoardGame | LoadBoardGames | AddBoardGames | ErrorBoardGames | PlayBoardGame | DoneBoardgames | RemoveBoardgame | SetBoardgameId | ErrorAddBoardGame | ErrorRemoveBoardgame;
