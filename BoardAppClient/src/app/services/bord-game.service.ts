import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BordGameService {

  apiUrl = '';
  constructor(private http: HttpClient, private userService: UserService) {
    this.apiUrl = 'http://' + window.location.hostname + ':3000/boardgames';
  }

  getBoardGames() {
      return this.http.get(this.apiUrl);
  }

  updateBoardGame(data: any) {
    return this.http.post(this.apiUrl, data).pipe(map(data => data));
  }

  deleteBoardGame(data: any) {
    return this.http.delete(this.apiUrl+"?id=" + data.Id);
  }
}
