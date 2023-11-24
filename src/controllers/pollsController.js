import { validationResult } from "express-validator";
import Poll from "../models/poll.js";
import Option from "../models/option.js";
import HttpError from "../models/http-error.js";

export default class PollsController {
  // Get all polls
  static async getAllPolls(req, res, next) {
    try {
      const polls = await Poll.find();
      res.json(polls);
    } catch (err) {
      const error = new HttpError(
        "Fetching polls failed, please try again later",
        500
      );
      return next(error);
    }
  }

  // Get a poll by id
  static async getPollById(req, res, next) {
    const pollId = req.params.id;
    try {
      const poll = await Poll.findById(pollId);
      if (!poll) {
        throw new Error("Poll not found!");
      }
      res.json(poll);
    } catch (err) {
      const error = new HttpError(
        "Fetching poll failed, please try again later",
        500
      );
      return next(error);
    }
  }

  // Create polls
  static async createPolls(req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check you data.", 422)
      );
    }

    const { question, options, dueDate } = req.body;

    const createdPoll = new Poll({
      question,
      dueDate,
      user: req.userId,
    });

    const createdOptions = options.map((option) => {
      return new Option({
        pollId: createdPoll._id,
        option,
      });
    });

    createdPoll.options = createdOptions;

    try {
      await createdPoll.save();
      await createdOptions.map((option) => {
        option.save();
      });
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Creating poll failed, please try again.",
        500
      );
      return next(error);
    }

    res.status(201).json({ poll: createdPoll });
  }

  // Update a poll by id
  static async updatePolls(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        console.log(errors),
        new HttpError("Invalid inputs passed, please check you data.", 422)
      );
    }

    const { question, options, dueDate } = req.body;
    const pollId = req.params.id;

    let poll;

    try {
      poll = await Poll.findById(pollId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update poll.",
        500
      );
      return next(error);
    }

    poll.question = question;
    poll.dueDate = dueDate;
    poll.user = req.userId;

    for (let optionId of poll.options) {
      let option;
      try {
        option = await Option.findById(optionId);
        await option.remove();
      } catch (err) {
        console.error("Error removing option:", err);
      }
    }

    const createdOptions = options.map((option) => {
      return new Option({
        pollId: poll._id,
        option,
      });
    });

    poll.options = createdOptions;

    try {
      await poll.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update poll.",
        500
      );
      return next(error);
    }

    res.status(200).json({ poll: poll.toObject({ getters: true }) });
  }

  // Delete a poll by id
  static async deletePolls(req, res, next) {
    const pollId = req.params.id;

    let poll;
    try {
      poll = await Poll.findById(pollId);
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Something went wrong, could not delete poll.",
        500
      );
      return next(error);
    }

    try {
      await Poll.deleteOne({ _id: pollId });
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Something went wrong, could not delete poll.",
        500
      );
      return next(error);
    }

    res.status(200).json({ message: "Deleted poll." });
  }

  // Vote
  static async vote(req, res, next) {
    const pollId = req.params.id;
    const optionId = req.params.optionId;

    let poll;
    try {
      poll = await Poll.findById(pollId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update poll.",
        500
      );
      return next(error);
    }

    let option;
    try {
      option = await Option.findById(optionId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update poll.",
        500
      );
      return next(error);
    }

    option.voters = [...option.voters, req.userId];

    try {
      await option.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update poll.",
        500
      );
      return next(error);
    }

    res.status(200).json({ poll: poll.toObject({ getters: true }) });
  }

  // Unvote
  static async unvote(req, res, next) {
    const pollId = req.params.id;
    const optionId = req.params.optionId;

    let poll;
    try {
      poll = await Poll.findById(pollId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update poll.",
        500
      );
      return next(error);
    }

    let option;
    try {
      option = await Option.findById(optionId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update poll.",
        500
      );
      return next(error);
    }

    option.voters = option.voters.filter((voter) => voter !== req.userId);

    try {
      await option.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update poll.",
        500
      );
      return next(error);
    }

    res.status(200).json({ poll: poll.toObject({ getters: true }) });
  }

  // Update a option by id
  static async updateOption(req, res, next) {
    const optionId = req.params.optionId;
    const { option } = req.body;

    let optionToUpdate;
    try {
      optionToUpdate = await Option.findById(optionId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update option.",
        500
      );
      return next(error);
    }

    optionToUpdate.option = option;

    try {
      await optionToUpdate.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update option.",
        500
      );
      return next(error);
    }

    res
      .status(200)
      .json({ option: optionToUpdate.toObject({ getters: true }) });
  }

  // Delete a option by id
  static async deleteOption(req, res, next) {
    const optionId = req.params.optionId;

    let option;
    try {
      option = await Option.findById(optionId);
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Something went wrong, could not delete option.",
        500
      );
      return next(error);
    }

    try {
      await Option.deleteOne({ _id: optionId });
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Something went wrong, could not delete option.",
        500
      );
      return next(error);
    }

    res.status(200).json({ message: "Deleted option." });
  }
}
