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

/* Things to think on
Figure out own clustering logic/find good npm package to do it
Figure out way to make workers automatically find master
Once up and running have workers ping master for health check.
  Master responds with a list of worker ip addresses
  If master dosn't respond then first worker to notice takes over as master
  replacement master pings all workers to register new master

Every x time master gets lastet list of data from all workers
  Once it has the data it groups all the data by id and keep the newest version


*/