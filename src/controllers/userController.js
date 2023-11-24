
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

import User from '../models/user.js';
import Family from '../models/family.js';

export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user) {
    throw new Error('User Not Found');
  }

  res.status(200).send(user);
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Error('Please fill all the fields.');
  }

  const user = await User.findById(req.userId);

  if (!user) {
    throw new Error('User Not Found');
  }

  const isMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isMatched) {
    throw new Error('Old password is incorrrect');
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedNewPassword;
  await user.save();

  res.status(200).send(user);
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, dob } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { name, dob },
    { new: true }
  );

  res.status(200).send(updatedUser);
});

export const getAllMembersInFamily = asyncHandler(async (req, res, next) => {
  const members = await Family.findById(req.params.familyId).populate(
    'members'
  );

  res.status(200).send(members);
});
