let fs = require('fs');
let express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./routes/Routes'); //importing route
routes(app); //register the route

app.listen(port);

if(!fs.existsSync('DB/DB.txt')){
  console.log('DB file doesnt exist. Creating file');
  
  let jsonData = JSON.stringify([]);
  fs.writeFile('DB/DB.txt', jsonData, function (err) {
    if (err) {
      throw err;
    }
    console.log('File is created successfully.');
  });
}

console.log('Boardgame RESTful API server started on: ' + port);