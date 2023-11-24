import mongoose from "mongoose";
import Savings from "../models/savings.js";
import HttpError from "../models/http-error.js";
import User from '../models/user.js';

const objectId = mongoose.Types.ObjectId;


export const createSavings = async (req, res, next) => {
    try {
      const { title, amount, targetDate, contributors, creator } = req.body;
      const savings = await Savings.create(req.body);
      const user = await User.findById(req.userId);

      if (user.role !== 'admin') {
        throw new Error('Unauthorized! You are not an admin');
      }

      const newSavings = new Savings({ 
        title,
        amount,
        targetDate : new Date(targetDate),
        contributors,                                                                                                                       
        creator: user.id,
        });
      await newSavings.save();

      res.json({ data: savings, status: "success" });
      console.log("You are posting new savings");
    } catch (err) {
      const error = new HttpError(err, 400);
      return next(error);
    }
  };

  export const  getAllSavings = async(req, res, next) => {
    try {
      const allSavings= await Savings.find({});
      res.json({ data: allSavings, status: "success" });
      console.log("All savings are listed");
    } catch (err) {
      const error = new HttpError(err, 400);
      return next(error);
    }
  };

 export const getOneSaving = async (req, res, next) => {
    const { id } = req.params;

    if (!objectId.isValid(id))
      return res.status(404).json({ message: `No saving with id: ${id}` });

    try {
      const saving = await Savings.findById(id);
      res.status(200).json(saving);
      console.log(`Retrieving Saving: ${id} successfully.`);
    } catch (err) {
        const error = new HttpError(err, 400);
        return next(error);
    }
  };


  export const  updateSavings = async(req, res, next) => {
    const { id } = req.params;
    const { title, amount, targetDate, contributors, creator } = req.body;

    if (!objectId.isValid(id))
      return res.status(404).json({ message: `No saving with id: ${id}` });

    
    const updatedSaving = { title, amount, targetDate, contributors, creator };
    

    try {
      await Savings.findByIdAndUpdate(id, updatedSaving, { new: true });
      res.status(200).json(updatedSaving);
      console.log(`Saving ${id} updated successfully.`);
    }   catch (err) {
            const error = new HttpError(err, 400);
            return next(error);
    }
  };


  export const deleteSavings = async (req, res, next) => {
    const { id } = req.params;

    if (!objectId.isValid(id))
      return res.status(404).json({ message: `No Saving with id: ${id}` });

    try {
      await Savings.findByIdAndRemove(id);

      res.status(200).json({ message: "Saving deleted successfully." });
      console.log("Saving deleted successfully.");
    } catch (err) {
        const error = new HttpError(err, 400);
        return next(error);
    }
  }
