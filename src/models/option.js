import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
    },
    option: {
      type: String,
      required: [true, 'Option is required'],
    },
    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Option = mongoose.model('Option', optionSchema);

export default Option;
