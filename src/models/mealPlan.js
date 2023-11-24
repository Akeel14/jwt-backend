import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema(
  {
    date:{
      type:Date,
      required:[true,'Date is required']
    },
    breakfast: {
      type: String,
      required: [true, 'Breakfast is required'],
    },
    lunch: {
      type: String,
      required: [true, 'Lunch is required'],
    },
    dinner: {
      type: String,
      required: [true, 'Dinner is required'],
    },
   
  },
  { timestamps: true }
);

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

export default MealPlan;
