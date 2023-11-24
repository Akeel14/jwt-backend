import express from 'express';
import { check } from 'express-validator';
import AuthController from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/login',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  AuthController.login
);

router.post(
  '/signup',
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("dob").isString(),
    check("role").isString().isIn(["user", "admin"]),
    check("family_code").custom((value, { req }) => {
      if (
        (req.body.role === "user" && (!value || value.length !== 5)) ||
        (req.body.role === "admin" && value)
      ) {
        throw new Error();
      }
      return true;
    }),
  ],
  AuthController.signup
);

export default router;
