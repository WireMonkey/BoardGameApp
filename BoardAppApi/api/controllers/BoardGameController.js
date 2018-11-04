'use strict';
let fs = require('fs');
let BoardGameData = [];
fs.readFile('DB/DB.txt', function(err, data) { 
  if (err) {
    console.log(err);
  }
  console.log(BoardGameData);
  BoardGameData = JSON.parse(data.toString('utf8'));
});

exports.GetAllBoardGames = function(req, res) {
    res.json(BoardGameData);
};

exports.SaveBoardGames = function(req, res) {
  console.log(req.body);
  let updateData = req.body;
  
  //If the boardgame exists the update the data to be the same
  if(BoardGameData.some(game => {
    return game.Name == updateData.Name;
  })) {
    console.log("exists");
    let newList = BoardGameData.filter(game => {
      return game.Name != updateData.Name;
    });

    BoardGameData = [];
    BoardGameData = newList;
  }

  BoardGameData.push(updateData);

  fs.writeFile('DB/DB.txt', JSON.stringify(BoardGameData), function (err) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log('File is created successfully.');
    res.json({message: 'Data Saved.'});
  });
};