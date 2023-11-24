import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Code is required"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Admin is required"],
      },
    ],
  },
  { timestamps: true }
);

const Family = mongoose.model("Family", familySchema);

export default Family;
