import express from 'express';

import AuthMiddleware from '../middleware/authMiddleware.js';
import * as TodoController from '../controllers/todoController.js';

const router = express.Router();

router.get('/', TodoController.getTasks);
router.post('/', AuthMiddleware.verifyToken, TodoController.addTask);
router.patch('/:todoId', AuthMiddleware.verifyToken, TodoController.updateTask);
router.delete(
  '/:todoId',
  AuthMiddleware.verifyToken,
  TodoController.deleteTask
);
// For participant to update completed task
router.patch(
  '/:todoId/is-completed',
  AuthMiddleware.verifyToken,
  TodoController.updateTaskIsCompleted
);

export default router;
