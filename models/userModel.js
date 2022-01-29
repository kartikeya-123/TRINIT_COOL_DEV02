//Imports
const mongoose = require("mongoose");
const validator = require("validator");

//Creating a user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the user should be specified"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    image: {
      type: String,
      default: null,
    },
    teams: [
      {
        teamId: {
          type: mongoose.Schema.ObjectId,
          ref: "Team",
        },
        role: {
          type: String,
        },
      },
    ],
    organisations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Organisation",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.index({ name: "text", email: "text" });

const User = mongoose.model("User", userSchema);
module.exports = User;
