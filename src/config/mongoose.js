import mongoose from 'mongoose';
import 'dotenv/config';

export const connectToMongo = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DB_URL);

    console.log('Connected to Mongo Successfully!');
  } catch (error) {
    console.log(error);
  }
}
