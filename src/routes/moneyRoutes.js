import express from 'express';
import AuthMiddleware from '../middleware/authMiddleware.js';
import {
  getAllSavings,
  getOneSaving,
  createSavings,
  updateSavings,
  deleteSavings,
} from '../controllers/moneyController.js';

const router = express.Router();

router.get('/', getAllSavings);
router.get('/:id', getOneSaving);
router.post('/', AuthMiddleware.verifyToken, createSavings);
router.put('/:id', AuthMiddleware.verifyToken, updateSavings);
router.delete('/:id', AuthMiddleware.verifyToken, deleteSavings);

export default router;
