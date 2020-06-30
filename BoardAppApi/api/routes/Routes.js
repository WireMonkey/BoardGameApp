'use strict';
module.exports = function(app) {
  var auth = require('../libs/auth');
  var boardGame = require('../controllers/BoardGameController');
  var users = require('../controllers/UserController');

  // todoList Routes
  app.route('/api/boardgames',)
    .get(auth.verifyJWTToken,boardGame.GetAllBoardGames)
    .post(auth.verifyJWTToken,boardGame.SaveBoardGames)
    .delete(auth.verifyJWTToken,boardGame.RemoveGame)

  app.route('/api/boardgames/clearcache')
    .get(auth.verifyJWTToken,boardGame.ClearCache);

  app.route('/api/boardgames/batchadd')
    .post(auth.verifyJWTToken,boardGame.AddManyBoardGames);

  app.route('/api/users')
    .get(auth.verifyJWTToken,users.getUserData)
    .post(users.CreateUser)
    .patch(auth.verifyJWTToken,users.updateUser);
  app.route('/api/users/valid')
    .post(users.ValidateUser);
  app.route('/api/users/setReset')
    .post(users.SetResetPassword);
  app.route('/api/users/reset') 
    .post(users.ResetPassword);
  app.route('/api/users/refresh')
    .get(auth.verifyJWTToken,users.refreshJwt);
};