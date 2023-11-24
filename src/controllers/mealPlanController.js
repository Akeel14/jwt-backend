import HttpError from "../models/http-error.js";
import MealPlan from "../models/mealPlan.js";


export const addMeal = async(req,res,next)=>{
    try{
        const newMeal = new MealPlan(req.body);
        await newMeal.save();
        res.status(200).json(newMeal);
    }catch(err){
        console.log(err)
        return next(new HttpError(err, 403));
    }

}

export const updateMealPlan = async(req,res)=>{

    const { id } = req.params;
    try {
      const updatedMealPlan = await MealPlan.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedMealPlan) {
        return res.status(404).json({ error: 'Mealplan not found' });
      }
      res.json(updatedMealPlan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
export const deleteMealPlan = async (req, res) => {
  try {
    const id = req.params.id
    const targetMealPlan = await MealPlan.findByIdAndDelete(id);

    if (!targetMealPlan) {
      return res.status(404).json({ error: 'Meal Plan not found' });
    }
    return res.status(200).json({ message: 'Meal Plan has been deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
  

export const getMealPlans= async (req,res,next)=>{
    try{
        const mealPlans = await MealPlan.find({});
        res.status(200).json(mealPlans)
    }catch(err){
        console.log(err);
        return next(new HttpError(err,403));
    }
}