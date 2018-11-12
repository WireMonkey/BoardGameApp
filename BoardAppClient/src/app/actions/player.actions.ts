import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { player } from './../models/player.model'

export const ADD_PLAYER = '[player] add'

export class AddPlayers implements Action {
  readonly type = ADD_PLAYER

  constructor(public payload: player) {}
}

export type Actions = AddPlayers