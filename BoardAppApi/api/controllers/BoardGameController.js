'use strict';
let fs = require('fs');
let Chance = require('chance');
const querystring = require('querystring');
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
  try {
    let userId = req.query.userid;
    if(userId){
      console.log(userId);
      let returnData = BoardGameData.filter(x => x.UserId == userId);
      if(returnData.length > 0) {
        res.json(returnData);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(500).send();  
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.SaveBoardGames = function(req, res) {
  try {
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
        res.status(500).send(error);
      }
      res.json({message: 'Data Saved.', Id: updateData.Id});
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.ClearCache = function(req, res) {
  try {
    fs.readFile('DB/DB.txt', function(err, data) { 
      if (err) {
        console.log(err);
        res.status(500).send(error);
      }
      BoardGameData = JSON.parse(data.toString('utf8'));

      BoardGameData.forEach(game => {
        if(!game.Id){
          game.Id = chance.guid();
        }
      });
      console.log(BoardGameData.length);
      res.json({message: 'Cache Reset.'});
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.RemoveGame = function(req, res) {
  try {
    let id = req.body.Id;
    BoardGameData = BoardGameData.filter(game => {
      return game.Id != id;
    });

    fs.writeFile('DB/DB.txt', JSON.stringify(BoardGameData), function (err) {
      if (err) {
        console.log(err);
        res.status(500).send(error);
      }
      res.json({message: 'Data Saved.'});
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
