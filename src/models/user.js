import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    dob: {
      type: Date,
      required: [true, "DOB is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: [true, "Role is required"],
    },
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
