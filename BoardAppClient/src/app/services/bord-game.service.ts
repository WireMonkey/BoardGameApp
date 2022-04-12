import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BordGameService {

  private apiUrl = '';
  firstLoad = false;
  
  constructor(private http: HttpClient, private userService: UserService) {
    this.apiUrl = environment.Url + 'api/boardgames';
  }

  getBoardGames() {
      return this.http.get(this.apiUrl);
  }

  updateBoardGame(data: any) {
    return this.http.post(this.apiUrl, data).pipe(map(data => data));
  }

  deleteBoardGame(data: any) {
    return this.http.delete(this.apiUrl+"?id=" + data._id);
  }
}
