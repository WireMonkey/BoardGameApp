'use strict';
const redis = require('redis');
const options = {host: ""};
const client = redis.createClient(options);


exports.Get_Players = function(req, res) {
    client.get("Players", function(err, data){
        if(err) throw err;

        if(data != null) {
            res.json(data);
        } else {
            data = {}//Get the players
            SetPlayerCache(req.body);
            res.json(data);
        }
    });
  };
  
  //Set players
  exports.Set_Players = function(req, res) {
    SetPlayerCache(req.body);
    res.json({message: "Cache set"});
  };

  function SetPlayerCache(data){
      client.set("Players",data);
  }