'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/BoardGameController');

  // todoList Routes
  app.route('/boardgames')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

  app.route('/boardgames/:_id')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};