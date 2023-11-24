import mongoose from 'mongoose';

const savingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    targetDate: {
      type: Date,
      required: [true, 'Target date is required'],
    },
    contributors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contributor',
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Savings = mongoose.model('Savings', savingsSchema);

export default Savings;
