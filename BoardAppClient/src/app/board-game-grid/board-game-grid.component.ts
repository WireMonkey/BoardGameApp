import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-game-grid',
  templateUrl: './board-game-grid.component.html',
  styleUrls: ['./board-game-grid.component.css']
})
export class BoardGameGridComponent implements OnInit {
  BoardGames: object[] = [
    {
      "Name": "Test",
      "_id": 0,
      "Expansions": [
        "exp1",
        "exp2"
      ],
      "Plays": [
        {
          "Date": "2018-01-01",
          "Players": [
            "Person1",
            "Person2"
          ],
          "winner":"person1"
        }
      ]
    },
    {
      "Name": "Test2",
      "_id": 1,
      "Expansions": [
        "exp1",
        "exp2"
      ],
      "Plays": [
        {
          "Date": "2018-01-01",
          "Players": [
            "Person1",
            "Person2"
          ],
          "winner":"person1"
        }
      ]
    },
    {
      "Name": "Test3",
      "_id": 2,
      "Expansions": [
        "exp1",
        "exp2"
      ],
      "Plays": [
        {
          "Date": "2018-01-01",
          "Players": [
            "Person1",
            "Person2"
          ],
          "winner":"person1"
        }
      ]
    }
  ]

  expDialogShow: boolean = false;
  playGameDialogShow: boolean = false;

  player: any;
  players: string[] = [];
  filteredPlayers: any[];
  playerList: string[] = ["player1","player2","player3","player4"];
  date1: Date;

  constructor() { }

  ngOnInit() {
  }

  AddExpansion() {
    this.expDialogShow = true;
  }

  PlayGame() {
    this.playGameDialogShow = true;
  }

  AddBoardGame() {
    console.log("Launch Add New Board Game popup.");
  }

  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  filterPlayers(event) {
    this.filteredPlayers = [];
    for(let i = 0; i < this.playerList.length; i++) {
        let brand = this.playerList[i];
        if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredPlayers.push(brand);
        }
    }
  }

  autoCompleteKeyPress(event){
    if ((event.keyCode === 188 || event.keyCode === 13) && (!this.isEmptyOrSpaces(this.player))){
      this.players.push(this.player);
      this.player = "";
    }
  }

  addPlayer(event){
    this.players.push(this.player);
    this.player = "";
  }
}
