'use strict';

require('./../models/BoardGameModel');
const mongoose = require('mongoose'),
  BoardGames = mongoose.model('BoardGames');
const playerController = require('./PlayerController.js');

exports.list_all_tasks = function(req, res) {
  BoardGames.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_BoardGames = new BoardGames(req.body);
  new_BoardGames.save(function(err, task) {
    if (err){
      res.send(err);
    }
    
    res.json(task);
  });
};

exports.read_a_task = function(req, res) {
  BoardGames.findById(req.params._id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  BoardGames.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, function(err, task) {
    if (err) {
      res.send(err);
    }
    //Update player cache
    let players = GetAllPlayers();
    if(players != null){
      playerController.Set_Players({body: players},null);
    } else {
      //Log this somewhere
    }
    
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {
  BoardGames.remove({
    _id: req.params._id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

function GetAllPlayers() {
  BoardGames.find({}, function(err, tasks){
    if(err){
      return null;
    }
    let players = [];
    tasks.forEach(t => {
      players.concat(t.players);
    });

    return players;
  });
};