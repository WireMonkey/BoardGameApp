import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RequestOptions, Request, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BordGameService {

  apiUrl: string = 'http://localhost:3000/boardgames'
  constructor(private http: HttpClient) { }

  getBoardGames(){
    return this.http.get(this.apiUrl).pipe(map(data => data));
  }

  updateBoardGame(data: any){
    return this.http.post(this.apiUrl,data).pipe(map(data => data));
  }
}
