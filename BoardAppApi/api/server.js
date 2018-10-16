var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/BoardGameModel.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blah');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/Routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Boardgame RESTful API server started on: ' + port);