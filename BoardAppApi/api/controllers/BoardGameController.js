'use strict';
const fs = require('fs');
const Chance = require('chance');
const chance = new Chance();
const axios = require('axios');
const myArgs = require('optimist').argv;
const dbConnections = myArgs.boardgame;

console.log(myArgs.boardgame);

exports.GetAllBoardGames = function(req, res) {
  try {
    //Make call to get all keys
    axios.get(dbConnections + '/_all_docs?include_docs=true').then(response => {
      res.json(response.data.rows.map(r => r.doc));
    }).catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.SaveBoardGames = function(req, res) {
  try {
    let updateData = req.body;
    
    if(!updateData._id){
      //If data is missing an id then add one.
      updateData._id = chance.guid();
      delete updateData._rev;
    }
    
    axios.put(dbConnections + '/' + updateData._id,updateData).then(response => {
      res.json(response.data);
    }).catch(error => {
      res.status(500).send("error saving data");
    })
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.RemoveGame = function(req, res) {
  try {
    let removeData = req.body;

    axios.delete(dbConnections + '/' + removeData._id + '?rev=' + removeData._rev).then(response => {
      res.json(response);
    }).catch(error => {
      res.status(500).send("error saving data");
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
