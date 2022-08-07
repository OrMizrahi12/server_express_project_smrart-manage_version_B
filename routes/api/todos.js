const express = require('express');
const router = express.Router();
const todoController = require('../../controllers/todoController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(todoController.getAllTodos)
    .post(todoController.createNewTodo)
    .put(todoController.updateTodo)
    .delete(todoController.deleteTodo);

router.route('/:_id')
    .get(todoController.getTodo)
    .delete(todoController.deleteTodo)
    .put(todoController.updateTodo);

router.route('/user/:userId')

    .get(todoController.getTodoById)
module.exports = router;
