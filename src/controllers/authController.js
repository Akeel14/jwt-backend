import { validationResult } from 'express-validator';
import User from '../models/user.js';
import Family from '../models/family.js';
import HttpError from '../models/http-error.js';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

export default class AuthController {
  static async signup(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check you data.', 422)
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { name, email, password, dob, role, family_code } = req.body;

      let familyCode = family_code;

      if (role === "admin" && !familyCode) {
        familyCode = AuthController.#generateFamilyCode();
      }

      // verify family code
      const existingFamily = await Family.findOne({ code: familyCode });

      if (
        (!existingFamily && role === "user") ||
        (existingFamily && role === "admin")
      ) {
        const errorMessage =
          role === "user"
            ? "Invalid family code."
            : "Generated family code duplicated.";

        return next(new HttpError(errorMessage, 422));
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        dob,
        role,
        familyId: existingFamily?._id, // familyId will be undefined if existingfamily is null
      });

      // create a new family
      if (!existingFamily) {
        const createdFamily = new Family({
          code: familyCode,
          members: [createdUser._id],
        });
        createdUser.familyId = createdFamily._id;
        await createdFamily.save({ session });
      } else {
        // add user to family's members list
        existingFamily.members.push(createdUser._id);
        await existingFamily.save({ session });
      }

      await createdUser.save({ session });
      await session.commitTransaction();

      res.status(201).json({ user: createdUser.toObject({ getters: true }) });
    } catch (err) {
      await session.abortTransaction();
      let errorMsg = "Signing up failed.";
      if (err.code === 11000) {
        errorMsg = "Email account existed already.";
      }
      const error = new HttpError(errorMsg, 500);
      return next(error);
    } finally {
      session.endSession();
    }
  }

  static async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check you data.', 422)
      );
    }

    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email: email });
      if (
        !existingUser ||
        !(await bcrypt.compare(password, existingUser.password))
      ) {
        return next(new HttpError('Invalid credentials, login failed.', 401));
      }

      const userToken = AuthController.#generateToken(existingUser.id);
      res.status(200).json({
        message: 'Logged In!',
        token: userToken,
        username: existingUser.name,
      });
    } catch (err) {
      // console.log(err);
      const error = new HttpError(
        'Logging in failed, please try again later',
        500
      );
      return next(error);
    }
  }

  // private methods
  static #generateToken(userId) {
    return jwt.sign({ userId: userId }, process.env.PRIVATE_KEY_JWT, {
      expiresIn: '1h',
    });
  }

  static #generateFamilyCode() {
    const uuid = uuidv4();
    return uuid.replace(/-/g, "").slice(0, 5);
  }
}
