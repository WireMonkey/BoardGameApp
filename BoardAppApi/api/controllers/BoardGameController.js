'use strict';
let fs = require('fs');
let Chance = require('chance');
const querystring = require('querystring');
let chance = new Chance();
let BoardGameData = [];

try {
  fs.readFile('DB/DB.txt', function(err, data) { 
    if (err) {
      console.error(err);
    }
    BoardGameData = JSON.parse(data.toString('utf8'));

    //If boardgame entries do not have id then add one.
    BoardGameData.forEach(game => {
      if(!game._id){
        game._id = chance.guid();
      }
    });
  });
} catch (error) {
  console.error(error);
}

exports.GetAllBoardGames = function(req, res) {
  try {
    let userId = req.decoded.userId;
    if(userId){
      let returnData = BoardGameData.filter(x => x.UserId == userId);
      if(returnData.length > 0) {
        res.json(returnData);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(401).send();  
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.SaveBoardGames = function(req, res) {
  try {
    let updateData = req.body;

    let userId = req.decoded.userId;
    updateData.UserId = userId;
    
    //If it has an id then remove the old data from the list.
    if(updateData._id){
      let newList = BoardGameData.filter(game => {
        return game._id != updateData._id;
      });
      BoardGameData = newList;
    } else {
      //If data is missing an id then add one.
      updateData._id = chance.guid();
    }

    BoardGameData.push(updateData);

    fs.writeFile('DB/DB.txt', JSON.stringify(BoardGameData), function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(error);
      }
      res.json({message: 'Data Saved.', id: updateData._id});
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.ClearCache = function(req, res) {
  try {
    fs.readFile('DB/DB.txt', function(err, data) { 
      if (err) {
        console.error(err);
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
    let id = req.query.id;

    BoardGameData = BoardGameData.filter(game => {
      return game._id != id;
    });

    fs.writeFile('DB/DB.txt', JSON.stringify(BoardGameData), function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(error);
      }
      res.json({message: 'Data Saved.'});
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.AddManyBoardGames = function(req,res){
  try {
    let userId = req.query.user;
    let addGames = req.body;

    addGames.forEach(game => {
      game.UserId = userId;
      game._id = chance.guid();
    });

    BoardGameData = BoardGameData.concat(addGames);

    fs.writeFile('DB/DB.txt', JSON.stringify(BoardGameData), function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(error);
      }
      res.json({message: 'Data Saved.'});
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
