'use strict';
let fs = require('fs');
let BoardGameData = [];
try {
  fs.readFile('DB/DB.txt', function(err, data) { 
    if (err) {
      console.log(err);
    }
    BoardGameData = JSON.parse(data.toString('utf8'));
  });
} catch (error) {
  console.log(error);
}

exports.GetAllBoardGames = function(req, res) {
    res.json(BoardGameData);
};

exports.SaveBoardGames = function(req, res) {
  let updateData = req.body;
  
  //If the boardgame exists the update the data to be the same
  if(BoardGameData.some(game => {
    return game.Name == updateData.Name;
  })) {
    let newList = BoardGameData.filter(game => {
      return game.Name != updateData.Name;
    });
    BoardGameData = newList;
  }

  BoardGameData.push(updateData);

  fs.writeFile('DB/DB.txt', JSON.stringify(BoardGameData), function (err) {
    if (err) {
      console.log(err);
      res.json({message: 'Error writing data', error: err});
    }
    console.log('File is created successfully.');
    res.json({message: 'Data Saved.'});
  });
};

exports.ClearCache = function(req, res) {
  fs.readFile('DB/DB.txt', function(err, data) { 
    if (err) {
      console.log(err);
      res.json({message: 'Error reading data', error: err});
    }
    BoardGameData = JSON.parse(data.toString('utf8'));
    res.json({message: 'Cache Reset.'});
  });
}