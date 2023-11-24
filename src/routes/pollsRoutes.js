import express from "express";
import { check } from "express-validator";
import PollsController from "../controllers/pollsController.js";

const router = express.Router();

// Get all polls
router.get("/", PollsController.getAllPolls);

// Get a poll by id
router.get("/:id", PollsController.getPollById);

// Create polls
router.post(
  "/",
  [check("question").isString().isLength({ min: 2 })],
  [check("options").isArray({ min: 2 })],
  [check("dueDate").isString()],
  PollsController.createPolls
);

// Vote
router.post("/:id/options/:optionId", PollsController.vote);

// Unvote
router.delete("/:id/options/:optionId", PollsController.unvote);

// Update polls
router.put(
  "/:id",
  [check("question").isString().isLength({ min: 2 })],
  [check("options").isArray().isLength({ min: 2 })],
  [check("dueDate").isString()],
  PollsController.updatePolls
);

// Delete polls
router.delete("/:id", PollsController.deletePolls);

export default router;
