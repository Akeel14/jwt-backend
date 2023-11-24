import express from 'express';
import AuthMiddleware from '../middleware/authMiddleware.js';
import * as mealPlanController from '../controllers/mealPlanController.js';


const router = express.Router();


router.get('/', mealPlanController.getMealPlans)
router.post("/",AuthMiddleware.verifyToken, mealPlanController.addMeal);
router.put('/:id', AuthMiddleware.verifyToken, mealPlanController.updateMealPlan)
router.delete('/:id', AuthMiddleware.verifyToken, mealPlanController.deleteMealPlan)


router.get('/',(req,res)=>{
    res.json('ff')
})

export default router