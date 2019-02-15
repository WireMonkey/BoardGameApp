'use strict';
module.exports = function(app) {
  var boardGame = require('../controllers/BoardGameController');
  var users = require('../controllers/UserController');

  // todoList Routes
  app.route('/boardgames')
    .get(boardGame.GetAllBoardGames)
    .post(boardGame.SaveBoardGames)
    .delete(boardGame.RemoveGame);

  app.route('/boardgames/clearcache')
    .get(boardGame.ClearCache);

  app.route('/users')
    .post(users.CreateUser);
  app.route('/users/valid')
    .post(users.ValidateUser);
  app.route('/users/setReset')
    .post(users.SetResetPassword);
  app.route('/users/reset')
    .post(users.ResetPassword);
};