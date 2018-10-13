import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-board-game-modal',
  templateUrl: './add-board-game-modal.component.html',
  styleUrls: ['./add-board-game-modal.component.css']
})
export class AddBoardGameModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addBoardGameShow: boolean = false;
  
  AddBoardGame() {
    this.addBoardGameShow = true;
  }
}
