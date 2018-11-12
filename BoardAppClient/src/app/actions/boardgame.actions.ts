import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { boardgame } from './../models/boardgames.model'

export const ADD_BOARDGAME = '[boardgame] add'
export const CLEAR_BOARDGAME = '[boardgame] clear'
export const UPDATE_BOARDGAME = '[boardgame] update'

export class AddBoardGame implements Action {
  readonly type = ADD_BOARDGAME

  constructor(public payload: boardgame) {}
}

export class ClearBoardGame implements Action {
  readonly type = CLEAR_BOARDGAME
  constructor() {}
}

export class UpdateBoardGame implements Action {
  readonly type = UPDATE_BOARDGAME;
  constructor(public payload: boardgame) {}
}

export type Actions = AddBoardGame | ClearBoardGame | UpdateBoardGame
