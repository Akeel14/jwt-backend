import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
