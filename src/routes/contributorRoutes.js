import express from 'express';
import AuthMiddleware from '../middleware/authMiddleware.js';
import { addContributions, getAllContributions,getOneContribution,updateContribution,deleteContribution} from '../controllers/contributorController.js';



const router = express.Router();

// add -  AuthMiddleware.verifyToken,
router.post('/',  AuthMiddleware.verifyToken, addContributions);
router.get('/', getAllContributions);
router.get('/:id', getOneContribution)


router.put('/:id', AuthMiddleware.verifyToken, updateContribution);
// add -  AuthMiddleware.verifyToken,
router.delete('/:id', AuthMiddleware.verifyToken,deleteContribution);

export default router;
