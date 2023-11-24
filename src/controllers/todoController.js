import asyncHandler from 'express-async-handler';
import Task from '../models/task.js';
import User from '../models/user.js';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



export const getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find();

  res.status(200).send(tasks);
});

export const addTask = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId);

  // Check the same creator - Admin
  if (user.role !== 'admin') {
    throw new Error('Unauthorized! You are not an admin');
  }
  const { title, dueDate, participant, creator } = req.body;

  const assignedUser = await User.findById(participant)

  const task = new Task({
    title,
    dueDate: new Date(dueDate),
    participant,
    creator: user.id,
  });
   
  await task.save();
  
  if(participant){
    const msg = {
      to: assignedUser.email,
      from: {
        name: 'HomeSync',
        email:'WhatNowmap@gmail.com'
      },
      subject: 'You has been assigned to a task',
      text: 'HomeSync',
      html: `<div style="background-color:#ffffff; text-align: center; font-size:1.5rem;">
                <p><span style="color:#0075C2">${user.name}</span> has assigned you a "${title}"</p>
                <p>Due Date is <span style="color:#234E70">${dueDate}</span></p>
            </div>`
    };
    sgMail.send(msg);
  }

  res.status(201).send(task);
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.todoId);

  if (!task) {
    throw new Error('Todo Not Found');
  }

  // Check the same creator - Admin
  if (task.creator.toString() !== req.userId) {
    throw new Error('Unauthorized! You are not an admin');
  }

  const { title, dueDate, status, participant } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.todoId,
    {
      title,
      dueDate,
      status,
      participant,
    },
    { new: true }
  );

  res.status(200).send(updatedTask);
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.todoId);

  if (!task) {
    throw new Error('Todo Not Found');
  }

  // Check the same creator - Admin
  if (task.creator.toString() !== req.userId) {
    throw new Error('Unauthorized! You are not an admin');
  }

  await Task.deleteOne();

  res.status(200).send({ message: 'Todo Deleted' });
});

export const updateTaskIsCompleted = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.todoId);

  if (!task) {
    throw new Error('Todo Not Found');
  }

  // Check the same paticipant
  if (task.participant.toString() !== req.userId) {
    throw new Error('Unauthorized! You are not the assigned person');
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.todoId,
    {
      status: 'is-completed',
    },
    { new: true }
  );

  res.status(200).send(updatedTask);
});
