//Imports
const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");

//Team Schema
const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A team should have a name"],
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Team must have a creator"],
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
      required: [true, "A team should have a description"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    privacy: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

teamSchema.index({ name: "text", email: "text" });

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
