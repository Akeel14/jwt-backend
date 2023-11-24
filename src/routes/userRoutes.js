import express from 'express';

import * as UserController from '../controllers/userController.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/my-profile',
  AuthMiddleware.verifyToken,
  UserController.getUserById
);

router.post(
  '/change-password',
  AuthMiddleware.verifyToken,
  UserController.changePassword
);

router.patch(
  '/update-profile',
  AuthMiddleware.verifyToken,
  UserController.updateProfile
);

router.get(
  '/all-members/:familyId',
  AuthMiddleware.verifyToken,
  UserController.getAllMembersInFamily
);

export default router;
