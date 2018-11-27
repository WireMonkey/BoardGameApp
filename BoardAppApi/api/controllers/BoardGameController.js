'use strict';
let fs = require('fs');
let Chance = require('chance');
let chance = new Chance();
let BoardGameData = [];
try {
  fs.readFile('DB/DB.txt', function(err, data) { 
    if (err) {
      console.log(err);
    }
    BoardGameData = JSON.parse(data.toString('utf8'));

    //If boardgame entries do not have id then add one.
    BoardGameData.forEach(game => {
      if(!game.Id){
        game.Id = chance.guid();
      }
    });
  });
} catch (error) {
  console.log(error);
}

exports.GetAllBoardGames = function(req, res) {
    res.json(BoardGameData);
};

exports.SaveBoardGames = function(req, res) {
  let updateData = req.body;
  
  //If it has an id then remove the old data from the list.
  if(updateData.Id){
    let newList = BoardGameData.filter(game => {
      return game.Id != updateData.Id;
    });
    BoardGameData = newList;
  } else {
    //If data is missing an id then add one.
    updateData.Id = chance.guid();
  }

  BoardGameData.push(updateData);

  fs.writeFile('DB/DB.txt', JSON.stringify(BoardGameData), function (err) {
    if (err) {
      console.log(err);
      res.json({message: 'Error writing data', error: err});
    }
    console.log('File is created successfully.');
    res.json({message: 'Data Saved.', Id: updateData.Id});
  });
};

exports.ClearCache = function(req, res) {
  fs.readFile('DB/DB.txt', function(err, data) { 
    if (err) {
      console.log(err);
      res.json({message: 'Error reading data', error: err});
    }
    BoardGameData = JSON.parse(data.toString('utf8'));

    BoardGameData.forEach(game => {
      if(!game.Id){
        game.Id = chance.guid();
      }
    });
    
    res.json({message: 'Cache Reset.'});
  });
}
