'use strict';
module.exports = function(app) {
  var boardGame = require('../controllers/BoardGameController');

  // todoList Routes
  app.route('/boardgames')
    .get(boardGame.GetAllBoardGames)
    .post(boardGame.SaveBoardGames)
    .delete(boardGame.RemoveGame);

  app.route('/boardgames/clearcache')
    .get(boardGame.ClearCache);
};