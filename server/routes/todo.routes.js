import { Router } from 'express';
import * as TodoController from './todo.controller';
const router = new Router();

// Get all Todos
router.route('/todos/:user').get(TodoController.getTodos);

// Add a new Todo
router.route('/todos').post(TodoController.addTodo);

// Delete a todo by cuid
router.route('/todos/delete/completed').delete(TodoController.deleteCompletedTodo);

// complete a todo by cuid
router.route('/todos/:cuid/complete').post(TodoController.completeTodo);

export default router;
