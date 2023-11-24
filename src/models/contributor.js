import mongoose from 'mongoose';

const contributorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    contributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'contributor is required'],
    }
  },
  { timestamps: true }
);

const Contributor = mongoose.model('Contributor', contributorSchema);

export default Contributor;
