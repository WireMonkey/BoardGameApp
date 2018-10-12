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
          ]
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
          ]
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
          ]
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  AddExpansion() {
    console.log("Launch add expansion popup.");
  }

  PlayGame() {
    console.log("Launch Play game popup.");
  }

  AddBoardGame() {
    console.log("Launch Add New Board Game popup.");
  }
}
