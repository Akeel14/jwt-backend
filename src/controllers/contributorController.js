import jwt from "jsonwebtoken";
import mongoose, { now } from "mongoose";
import Contributor from "../models/contributor.js";
import HttpError from "../models/http-error.js";
import User from "../models/user.js";
import 'dotenv/config';

const objectId = mongoose.Types.ObjectId;


export const addContributions = async (req, res, next) => {
    try {
      // Get the JWT token from the Authorization header
      const token = req.headers.authorization;
      console.log(token);
      const user = await User.findById(req.contributorId);
  
      // Verify and decode the token
      jwt.verify(token, process.env.PRIVATE_KEY_JWT, async (err, decoded) => {
        if (err) {
          // Token is invalid or expired
          res.status(401).json({ message: 'Unauthorized' });
        } else {
          // Token is valid; you can access user information from `decoded`
          const { amount, date, contributorId } = req.body;
  
          // Create the contribution
          const contribution = await Contributor.create({
            userId: contributorId,
            amount,
            date : new Date(date), // Use the date from the request
            contributorId: contributorId
          });
  
          res.status(201).json({ data: contribution, status: 'success' });
          console.log('Contribution created successfully');
        }
      });
    } catch (err) {
      console.log(err);
      const error = new HttpError(err, 400);
      return next(error);
    }
  };
 
  export const getAllContributions = async (req, res, next) => {
    try {
      // Check if the user making the request is an admin
      // const user = await User.findById(req.userId);
      // if (user.role !== 'admin') {
      //   throw new Error('Unauthorized! You are not an admin');
      // }
  
      const allContributions = await Contributor.find({});
      res.json({ data: allContributions, status: "success" });
      console.log("All contributions are listed");
    } catch (err) {
      const error = new HttpError(err, 400);
      return next(error);
    }
  };


  export const getOneContribution = async (req, res, next) => {
    const { id } = req.params;
  
    if (!objectId.isValid(id))
      return res.status(404).json({ message: `No contribution with id: ${id}` });
  
    try {
      // Check if the user making the request is an admin
      // const user = await User.findById(req.userId);
      // if (user.role !== 'admin') {
      //   throw new Error('Unauthorized! You are not an admin');
      // }
  
      const contribution = await Contributor.findById(id);
      res.status(200).json(contribution);
      console.log(`Retrieving Contribution: ${id} successfully.`);
    } catch (err) {
      const error = new HttpError(err, 400);
      return next(error);
    }
  };


  export const updateContribution = async (req, res, next) => {
    const { id } = req.params;
    const { amount, date, contributorId , userId} = req.body;
  
    if (!objectId.isValid(id))
      return res.status(404).json({ message: `No contribution with id: ${id}` });
  
    const updatedContribution = { amount, date, contributor: contributorId };
  
    try {
      // Check if the user making the request is an admin
      const user = await User.findById(userId);
      if (user.role !== 'admin') {
        throw new Error('Unauthorized! You are not an admin');
      }
  
      await Contributor.findByIdAndUpdate(id, updatedContribution, { new: true });
      res.status(200).json(updatedContribution);
      console.log(`Contribution ${id} updated successfully.`);
    } catch (err) {
      const error = new HttpError(err, 400);
      return next(error);
    }
  };

  
  export const deleteContribution = async (req, res, next) => {
    const { id } = req.params;
  
    if (!objectId.isValid(id))
      return res.status(404).json({ message: `No contribution with id: ${id}` });
  
    try {
      // Check if the user making the request is an admin
      const user = await User.findById(req.body.userId);
      if (user.role !== 'admin') {
        throw new Error('Unauthorized! You are not an admin');
      }
  
      await Contributor.findByIdAndRemove(id);
      res.status(200).json({ message: "Contribution deleted successfully." });
      console.log("Contribution deleted successfully.");
    } catch (err) {
      const error = new HttpError(err, 400);
      return next(error);
    }
  };
  
  
  
  