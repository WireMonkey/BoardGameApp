import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { boardgame } from './../models/boardgames.model'

export const ADD_BOARDGAME = '[boardgame] add'
export const CLEAR_BOARDGAME = '[boardgame] clear'

export class AddBoardGame implements Action {
  readonly type = ADD_BOARDGAME

  constructor(public payload: boardgame) {}
}

export class ClearBoardGame implements Action {
  readonly type = CLEAR_BOARDGAME
  constructor() {}
}

export type Actions = AddBoardGame | ClearBoardGame
