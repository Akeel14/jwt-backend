import asyncHandler from 'express-async-handler';
import Event from '../models/event.js';

export const getEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).send(events);
});

export const addEvent = asyncHandler(async (req, res, next) => {
  const { title, location, startDate, endDate } = req.body;

  if (!title || !location || !startDate || !endDate) {
    throw new Error('Please fill all the fields.');
  }

  const event = new Event({
    title,
    location,
    startDate,
    endDate,
    creator: req.userId,
  });

  await event.save();

  res.status(201).send(event);
});

export const updateEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    throw new Error('Event Not Found');
  }

  // Check if the user deleting this event is the creator
  if (req.userId !== event.creator.toString()) {
    throw new Error('Unauthorized! Not a creator of this event');
  }

  const { title, location, startDate, endDate } = req.body;

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.eventId,
    { title, location, startDate, endDate },
    { new: true }
  );

  res.status(200).send(updatedEvent);
});

export const deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    throw new Error('Event Not Found');
  }

  // Check if the user deleting this event is the creator
  if (req.userId !== event.creator.toString()) {
    throw new Error('Unauthorized! Not a creator of this event');
  }

  await event.deleteOne();

  res.status(200).send({ message: 'Event Deleted' });
});

export const getEventByDate = asyncHandler(async (req, res, next) => {
  // Input Date Format: 2023-09-18
  const start = new Date(req.params.date);
  const end = new Date(req.params.date);
  end.setHours(43, 59, 59, 999);
  const events = await Event.find({
    startDate: {
      $gte: start,
      $lte: end,
    },
  });

  res.status(200).send(events);
});
