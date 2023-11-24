import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import eventRoutes from './eventRoutes.js';
// import other defined routes in here
import pollsRoutes from "./pollsRoutes.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import homeRoutes from './homeRoutes.js';
import mealPlanRoutes from './mealPlan.js'
import todoRoutes from './todoRoutes.js';
import moneyRoutes from './moneyRoutes.js';
import notificationRoute from './notificationRoute.js'
import contributorRoutes from './contributorRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use("/home",homeRoutes)
router.use("/auth", authRoutes);
router.use('/events', eventRoutes);

// register other routes in here
router.use("/polls", AuthMiddleware.verifyToken, pollsRoutes)
router.use('/mealPlan', mealPlanRoutes)
router.use('/todos', todoRoutes);
router.use('/savings', moneyRoutes );
router.use('/notification',notificationRoute);
router.use('/contributor', contributorRoutes);

export default router;
