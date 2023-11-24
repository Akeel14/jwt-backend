import express from 'express';

import * as EventController from '../controllers/eventController.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', EventController.getEvents);

// Input Date Format: 2023-09-18
router.get('/:date', EventController.getEventByDate);

router.post('/', AuthMiddleware.verifyToken, EventController.addEvent);

router.patch(
  '/:eventId',
  AuthMiddleware.verifyToken,
  EventController.updateEvent
);

router.delete(
  '/:eventId',
  AuthMiddleware.verifyToken,
  EventController.deleteEvent
);

export default router;
