'use strict';

const mongoose = require('mongoose'),
  Task = mongoose.model('BoardGame');
const playerController = require('./PlayerController.js');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err){
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

exports.read_a_task = function(req, res) {
  Task.findById(req.params._id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params._id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

function GetAllPlayers() {
  Task.find({}, function(err, tasks){
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