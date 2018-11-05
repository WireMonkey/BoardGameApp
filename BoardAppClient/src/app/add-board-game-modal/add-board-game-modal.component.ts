import { BordGameService } from './../services/bord-game.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-board-game-modal',
  templateUrl: './add-board-game-modal.component.html',
  styleUrls: ['./add-board-game-modal.component.css']
})
export class AddBoardGameModalComponent implements OnInit {
  public NewBoardGame: string = "";

  constructor(private service: BordGameService) { }

  ngOnInit() {
  }

  addBoardGameShow: boolean = false;

  AddBoardGame() {
    let boardGame = {Name: this.NewBoardGame};
    this.service.updateBoardGame(boardGame).subscribe(data =>{
      console.log(data);
      this.addBoardGameShow = false;
    })
  }

  ShowModal() {
    this.NewBoardGame = "";
    this.addBoardGameShow = true;
  }
}
