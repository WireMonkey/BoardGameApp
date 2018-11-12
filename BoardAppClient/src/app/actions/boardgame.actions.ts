import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { boardgame } from './../models/boardgames.model'

export const ADD_BOARDGAME = '[boardgame] add'

export class AddBoardGame implements Action {
  readonly type = ADD_BOARDGAME

  constructor(public payload: boardgame) {}
}

export type Actions = AddBoardGame
