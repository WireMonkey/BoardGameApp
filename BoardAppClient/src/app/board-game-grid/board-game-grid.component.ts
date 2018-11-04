import { BordGameService } from './../services/bord-game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-game-grid',
  templateUrl: './board-game-grid.component.html',
  styleUrls: ['./board-game-grid.component.css']
})
export class BoardGameGridComponent implements OnInit {
  BoardGames: any;

  constructor(private service: BordGameService) { }

  ngOnInit() {
     this.service.getBoardGames().subscribe(data =>{
       this.BoardGames = data;
       console.log(data);
     });
  }


}
