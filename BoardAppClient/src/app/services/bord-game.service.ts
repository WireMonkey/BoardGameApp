import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RequestOptions, Request, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BordGameService {

  apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.apiUrl = 'http://' + window.location.hostname + ':3000/boardgames'
  }

  getBoardGames(){
      return this.http.get(this.apiUrl).pipe(map(data => data));
  }

  updateBoardGame(data: any){
    return this.http.post(this.apiUrl,data).pipe(map(data => data));
  }
}
