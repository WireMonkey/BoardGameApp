var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./models/BoardGameModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://192.168.1.15:27017/BoardGame');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/Routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Boardgame RESTful API server started on: ' + port);